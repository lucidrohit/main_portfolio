import Head from "next/head";
import React from "react";
import Navbar from "../../components/Frontend/Navbar";
import { useState, useEffect } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { projectsCollectionRef } from "../../utils/Firebase/firebaseConfig";
import { Button } from "@mui/material";

/*
   ! &>h1 -> heading 1
   ! &>h2 -> heading 2
   ! &>h3 -> heading 3
   ! &>h4 -> heading 4
   ! &>h5 -> heading 5
   ! &>h6 -> heading 6
   ! &>p -> paragraph
   ! &>p>a -> anchor
   ! &>p>strong ->bold
   ! &>p>em -> italic
   ! &>p>u -> underline
   ! &>p>strong>em -> bold italic
   ! &>p>strong>em>u -> bold italic underline
   ! &>p>em>u -> italic underline
   ! &>ol>li -> ordered list
   ! &>ul>li -> unordered list
   ! &>iframe -> video
*/
const Project = ({ projectId }) => {
  const [project, setProject] = useState({});
  const q = query(projectsCollectionRef, where("id", "==", projectId));
  const [projectsSnapshot] = useCollection(q);
  useEffect(() => {
    if (projectsSnapshot) {
      setProject(projectsSnapshot?.docs[0]?.data());
    }
  }, [projectsSnapshot]);
  return (
    <div>
      <Head>
        <title>{project.title}</title>
      </Head>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <img
          src={project.image}
          loading="lazy"
          className="h-40 object-contain mx-auto"
        />
        <h2 className="text-3xl md:4xl text-center break-words font-bold p-4 ">
          {project.title}
        </h2>
        <div
          className="p-2 break-words
               [&>p>img]:w-[100%] [&>p>img]:mx-auto [&>p>img]:mb-3 [&>p>img]:mt-5
               [&>h1]:text-3xl [&>h1]:font-semibold  [&>h1]:mb-3 [&>h1]:mt-4
               [&>h2]:text-2xl  [&>h2]:mb-2 [&>h2]:mt-4
               [&>h2]:font-medium 
               [&>h3]:text-lg 
               [&>h4]:text-base 
               [&>h5]:text-sm 
               [&>h6]:text-xs 
               [&>.ql-size-small]:text-red-600 [&>p>a]:text-indigo-700 [&>p>a]:underline  hover:[&>p>a]:text-blue-400
               "
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
        <h4 className="p-3 font-bold">
          Project Link :{" "}
          <a target="_blank" href={project.projectLink}>
            <Button className="ml-3" variant="outlined">
              Click Here
            </Button>
          </a>
        </h4>
        <h4 className="p-3 font-bold">
          Github Link :{" "}
          <a target="_blank" href={project.github}>
            <Button className="ml-3" variant="outlined">
              Click Here
            </Button>
          </a>
        </h4>
        <hr className="pb-10" />
      </div>
    </div>
  );
};
export default Project;

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      projectId: params.id,
    },
    // revalidate: 10,
  };
};
// export const getStaticPaths = async () => {
//   const getProjects = await getDocs(projectsCollectionRef);
//   const paths = getProjects?.docs?.map((projectsArray) => ({
//     params: { id: projectsArray.id },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };