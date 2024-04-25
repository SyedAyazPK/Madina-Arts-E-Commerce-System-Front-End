import History from "@history";
import { Button, Typography } from "@mui/material";

export const Banner = () => {
  return (
    <div>
      <div className="banner-container">
        <img
          src="assets/images/ecom/banner.jpeg"
          className="w-full"
          // style={{ maxHeight: "52rem" }}
        />
        {/* <div className='custom-position max-w-320'>
          <Typography className='md:text-4xl font-bold'>
            This is a headline
          </Typography>
          <Typography className='my-16 hidden sm:flex'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry
          </Typography>
          <Typography className='my-16 sm:hidden flex'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            className='my-16 px-32 button-class'
            onClick={() => History.push('/sign-up')}
          >
            Get Started
          </Button>
        </div> */}
      </div>
    </div>
  );
};
