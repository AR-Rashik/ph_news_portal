import RootLayout from "@/components/Layouts/RootLayout";
import AllNews from "@/components/UI/AllNews";

const AllNewsPage = ({ allNews }) => {
  return (
    <>
      <AllNews allNews={allNews} />
    </>
  );
};

export default AllNewsPage;

AllNewsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();

  // console.log(data);

  return {
    props: {
      allNews: data.data,
    },
  };
};
