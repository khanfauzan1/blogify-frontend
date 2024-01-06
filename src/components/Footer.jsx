const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[400px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start  justify-between text-sm md:text-md py-8 md:mt-8">
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Post</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>

      <p className="pb-6 text-center text-white bg-black text-sm">
        All Rights Reserved &copy;Blogify 2024
      </p>
    </>
  );
};

export default Footer;
