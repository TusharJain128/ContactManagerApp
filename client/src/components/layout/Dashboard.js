// import React, { useEffect, useState } from "react";

// //import { getPosts } from "../../scripts/dashboard";

// export default function Dashboard() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     //getPosts()
//       .then((response) => {
//         setPosts(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       {posts.length > 0 &&
//         posts.map((post) => {
//           const { author, text } = post;
//           return (
//             <div key={Math.random()}>
//               <div class="max-w-md rounded overflow-hidden shadow-lg">
//                 <img class="w-full" src="recipe-image.jpg" alt="Recipe Image" />
//                 <div class="px-6 py-4">
//                   <div class="flex items-center mb-2">
//                     <div>
//                       <div class="font-bold text-xl">Recipe Name</div>
//                       <p class="text-gray-700 text-base">By Recipe Author</p>
//                     </div>
//                   </div>
//                   <ul class="list-disc ml-5 mb-4">
//                     <li>Recipe Item 1</li>
//                     <li>Recipe Item 2</li>
//                     <li>Recipe Item 3</li>
//                   </ul>
//                   <p class="text-gray-700 text-base mt-4">Recipe Procedure:</p>
//                   <p class="text-gray-700 text-base">{text}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
