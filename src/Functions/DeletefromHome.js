// useHomeDelete.js
import { useMutation, useQueryClient } from 'react-query';

import toast from 'react-hot-toast';
import { deleteCard } from '../Sevices/deleteCard';

export function useHomeDelete() {
    const queryClient = useQueryClient();

    const { mutate: DeleteMutate, isLoading: isDeleting } = useMutation({
        mutationFn: async (data) => {
            try {
                console.log(data);

                // Check if the device is online before making the delete request
                if (navigator.onLine) {
                    await deleteCard(data);
                } else {
                    throw new Error('Device is offline');
                }
            } catch (error) {
                throw error; // Propagate the error to trigger onError callback
            }
        },
        onSuccess: () => {
             queryClient.invalidateQueries(['Card']);
             toast.success('Successfully Deleted');
        },
        onError: (err) => {
            toast.error('Some Error Occurred');
            console.error(err);
        },
    });

    return { DeleteMutate, isDeleting };
}
