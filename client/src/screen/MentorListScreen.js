import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersmentor } from "../actions/UserAction.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import { mentor_DETAILS_RESET } from "../constants/mentorConstants";

export default function MentorListScreen(props) {
  const userListMentor = useSelector((state) => state.userListMentor);
  const { loading, error, usersmentor } = userListMentor;

  //   const mentorDelete = useSelector((state) => state.mentorDelete);
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete,
  //   } = mentorDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsersmentor());
    // dispatch({ type: mentor_DETAILS_RESET });
  }, [dispatch]);
  //   const deleteHandler = (mentor) => {
  //     if (window.confirm("Are you sure?")) {
  //       dispatch(deletementor(mentor._id));
  //     }
  //   };
  return (
    <div>
      <h1>Mentor List</h1>
      {/* {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">mentor Deleted Successfully</MessageBox>
      )} */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>MENTOR NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NUMBER</th>
              <th>COMPANY NAME</th>
              <th>EMPLOYEE ID</th>
              <th>Verified</th>

              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {usersmentor.map((mentor) => (
              <tr key={mentor._id}>
                <td>{mentor._id}</td>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.mobilenumber}</td>
                <td>{mentor.companyName}</td>
                <td>{mentor.employeeIDNumber}</td>
                <td>{mentor.verificationstatus ? "YES" : "NO"}</td>

                <td>
                  <button
                    type="button"
                    className="small"
                    // onClick={() => deleteHandler(mentor)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function MentorListScreen() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/users/mentor/mentorlist")
//       .then((res) => {
//         console.log(res);
//         setPosts(res.data);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Booking LIst Of All The Applicant</h1>

//       {/* <div>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>USER</th>

//               <th>Name</th>
//               <th>Mobile Number</th>
//               <th>ID</th>
//               <th>Age</th>
//               <th>Photo ID Proof Name</th>
//               <th>Photo ID Proof Number</th>
//               <th>Any Dieases</th>
//               <th>Vaccine Center</th>
//               <th>Vaccine Date</th>
//               <th>Vaccine Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {posts.map((post) => (
//               <tr key={post._id}>
//                 <td>{post._id}</td>
//                 <td>{post.name}</td>
//                 <td>{post.mobilenumber}</td>
//                 <td>{post.birthdate}</td>
//                 <td>{post.age}</td>
//                 <td>{post.photoidproof}</td>
//                 <td>{post.idproofnumber}</td>
//                 <td>{post.sideinfo}</td>
//                 <td>{post.hoslocation}</td>
//                 <td>{post.dateinfo}</td>
//                 <td>{post.timeinfo}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}

//       <ul>
//         {posts.map((post) => (
//           <li key={post._id}>
//             <td>{post._id}</td>
//             <td>{post.name}</td>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MentorListScreen;
