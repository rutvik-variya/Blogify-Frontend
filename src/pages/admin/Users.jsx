import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllUsers } from "../../features/dashboard/adminDashboardSlice"

const Users = () => {
    const dispatch = useDispatch();

    const { users, userLoading, error } = useSelector((state) => state.adminDashBoard);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    console.log(users)
    return (
        <div>
            <h2>This is user Page</h2>
        </div>
    )
}

export default Users
