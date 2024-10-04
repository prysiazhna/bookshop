import React from "react";
import { User } from "../../../models/auth.models";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteUser, selectUsers, selectUsersError, selectUsersLoading} from "../../../store/slices/userSlice";
import Table from "../../common/DataTable";

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const loading = useAppSelector(selectUsersLoading);
    const error = useAppSelector(selectUsersError);

    const userColumns = [
        { header: 'Username', render: (user: User) => user.username },
        { header: 'Email', render: (user: User) => user.email },
    ];
    const handleDeleteUser = (userId: number) => {
        dispatch(deleteUser(userId));
    };
    return (
        <div className="p-4 w-full">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Table
                    data={users}
                    columns={userColumns}
                    actions={(user: User) => (
                        <div className="flex-row justify-center items-center space-y-2">
                            <button
                                className="w-16 py-1 bg-gray-200 text-black text-xs rounded hover:bg-gray-300"
                                onClick={() => handleDeleteUser(user.id)}>
                                Delete
                            </button>
                        </div>
                    )}
                />
            )}
        </div>
    );
};

export default UsersPage;
