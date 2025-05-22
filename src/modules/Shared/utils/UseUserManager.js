import { toast } from "react-toastify";

export const UserStatus = {
    Active: "Active",
    Removing: "Removing",
};

export default function useUserManager(users, setUsers) {
    const undoDeleteUser = (id) => {
        setUsers((state) =>
            state.map((user) => {
                if (user.id === id) {
                    return { ...user, status: UserStatus.Active };
                }
                return user;
            })
        );
    };

    const deleteUserFoReal = (id) => {
        setUsers((state) => state.filter((user) => user.id !== id));
    };

    const deleteUser = (e) => {
        const userId = e.target.dataset.id;

        const nextState = users.map((user) =>
            user.id === userId ? { ...user, status: UserStatus.Removing } : user
        );

        setUsers(nextState);

        toast.info("User will be deleted. Undo?", {
            onClose: (removedByUser) => {
                if (removedByUser) return;
                deleteUserFoReal(userId);
            },
            data: {
                onUndo: () => undoDeleteUser(userId),
            },
        });
    };

    return {
        deleteUser,
        undoDeleteUser,
        deleteUserFoReal,
    };
}
