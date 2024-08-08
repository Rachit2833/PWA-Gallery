import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import readline from "readline";
import puppeteer from "puppeteer";
import createCsvWriter from "csv-writer";

// Function to fetch PubMed search results
async function searchPubMed(
  query = "cancer",
  start = 0,
  freeFullTextFilter = false,
  maxResults = 100
) {
  const url = new URL(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
  );
  const params = {
    db: "pubmed",
    term: query + (freeFullTextFilter ? " AND free full text[filter]" : ""),
    retmode: "xml",
    retstart: start,
    retmax: maxResults,
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url);
  const data = await response.text();
  return data;
}

// Function to fetch PubMed details for a given list of IDs
async function fetchPubMedDetails(ids) {
  const url = new URL(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
  );
  const params = {
    db: "pubmed",
    id: ids.join(","),
    retmode: "xml",
    rettype: "abstract",
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url);
  const data = await response.text();
  return data;
}

// Function to extract details from the fetched PubMed details
function extractDetails(xmlString) {
  const dom = new JSDOM(xmlString, { contentType: "text/xml" });
  const doc = dom.window.document;

  const articles = doc.querySelectorAll("PubmedArticle");
  const results = [];

  articles.forEach((article) => {
    const title =
      article.querySelector("ArticleTitle")?.textContent || "No title found";
    const authors =
      Array.from(article.querySelectorAll("AuthorList Author"))
        .map(
          (author) =>
            `${author.querySelector("LastName")?.textContent || ""} ${
              author.querySelector("ForeName")?.textContent || ""
            }`
        )
        .join(", ") || "No authors found";
    const abstract =
      Array.from(article.querySelectorAll("AbstractText"))
        .map((abstract) => abstract.textContent)
        .join(" ") || "No abstract found";
    const publicationDate =
      article.querySelector("PubDate Year")?.textContent ||
      "No publication date found";
    const journal =
      article.querySelector("Journal Title")?.textContent ||
      "No journal title found";
    const volume =
      article.querySelector("Journal Issue Volume")?.textContent ||
      "No volume found";
    const issue =
      article.querySelector("Journal Issue Issue")?.textContent ||
      "No issue found";
    const doi =
      article.querySelector('ArticleId[IdType="doi"]')?.textContent ||
      "No DOI found";
    const doiLink =
      doi !== "No DOI found" ? `https://doi.org/${doi}` : "No DOI link";
    const link =
      `https://pubmed.ncbi.nlm.nih.gov/${
        article.querySelector("PMID")?.textContent
      }` || "No link found";

    results.push({
      title,
      authors,
      abstract,
      publicationDate,
      journal,
      volume,
      issue,
      doi,
      doiLink,
      link,
      fullText: "", // Placeholder for full text to be fetched later
    });
  });

  return results;
}

// Function to prompt the user to load more results
function promptLoadMore() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Load more results? (yes/no): ", (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

// Function to fetch and extract text content from a DOI link using Puppeteer
async function fetchAndExtractText(url) {
  const browser = await puppeteer.launch({ headless: false }); // Use headless: false for debugging
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Handle potential Cloudflare security checks
    const cloudflareCheck = await page.evaluate(() => {
      return document
        .querySelector("h1")
        ?.innerText.includes("Checking your browser before accessing");
    });

    if (cloudflareCheck) {
      console.log(
        "Cloudflare security check detected. Waiting for it to complete..."
      );
      await page.waitForSelector("body", { timeout: 30000 });
    }

    // Extract text content from the body element, excluding unwanted elements
    const text = await page.evaluate(() => {
      const unwantedElements = document.querySelectorAll(
        "script, style, noscript, iframe, button, a, .cookie-popup, .modal, .popup"
      );
      unwantedElements.forEach((el) => el.remove());

      const body = document.body;
      return body ? body.innerText.trim() : "";
    });

    await browser.close();
    return text;
  } catch (error) {
    console.error("Error fetching and extracting text:", error);
    await browser.close();
    return "Unable to extract content due to security measures.";
  }
}

// Function to fetch and extract PubMed details and store them in CSV
async function fetchAndExtractPubMedDetails(query) {
  let start = 0;
  const maxResults = 10;
  let loadMore = true;
  const allResults = [];

  while (loadMore) {
    try {
      const searchResults = await searchPubMed(query, start);
      const dom = new JSDOM(searchResults, { contentType: "text/xml" });
      const doc = dom.window.document;
      const ids = Array.from(doc.querySelectorAll("Id")).map(
        (id) => id.textContent
      );

      const details = await fetchPubMedDetails(ids);
      const extractedDetails = extractDetails(details);

      for (const detail of extractedDetails) {
        if (detail.doiLink !== "No DOI link") {
          const doiContent = await fetchAndExtractText(detail.doiLink);
          detail.fullText = doiContent;
        } else {
          detail.fullText = "No DOI link found";
        }

        allResults.push(detail);

        console.log("Title:", detail.title);
        console.log("Authors:", detail.authors);
        console.log("Abstract:", detail.abstract);
        console.log("Publication Date:", detail.publicationDate);
        console.log("Journal:", detail.journal);
        console.log("Volume:", detail.volume);
        console.log("Issue:", detail.issue);
        console.log("DOI:", detail.doi);
        console.log("DOI Link:", detail.doiLink);
        console.log("Link:", detail.link);
        console.log("Full Text:", detail.fullText);
        console.log("---");
      }

      start += maxResults;
      loadMore = await promptLoadMore();
    } catch (error) {
      console.error("Error fetching and extracting PubMed details:", error);
      break;
    }
  }

  // Convert results to CSV
  if (allResults.length > 0) {
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: "pubmed_results.csv",
      header: [
        { id: "title", title: "Title" },
        { id: "authors", title: "Authors" },
        { id: "abstract", title: "Abstract" },
        { id: "publicationDate", title: "Publication Date" },
        { id: "journal", title: "Journal" },
        { id: "volume", title: "Volume" },
        { id: "issue", title: "Issue" },
        { id: "doi", title: "DOI" },
        { id: "doiLink", title: "DOI Link" },
        { id: "link", title: "Link" },
        { id: "fullText", title: "Full Text" },
      ],
    });

    await csvWriter.writeRecords(allResults);
    console.log("CSV file successfully written.");
  }
}

// Example usage
const query = "lung cancer"; // Replace with your query
fetchAndExtractPubMedDetails(query);
