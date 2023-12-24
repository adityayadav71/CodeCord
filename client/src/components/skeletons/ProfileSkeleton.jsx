const ProfileSkeleton = () => {
  return (
    <div className='flex flex-col w-full px-6 gap-x-6 grow'>
      <div className='sm:hidden flex flex-col gap-4 w-full drop-shadow-xl rounded-2xl mt-10 p-6 bg-secondary'>
        <div className='flex flex-row gap-6'>
          <div className='group flex animate-pulse bg-grey1 justify-center min-w-[80px] w-[80px] h-[80px] rounded-lg overflow-hidden' />
          {/* Rest Value Div */}
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between'>
              <div className='w-[100px] h-[15px] animate-pulse bg-grey1 rounded-lg' />

              <div className='flex gap-4 pl-6 items-center'>
                <div className='rounded-full w-[15px] h-[15px] animate-pulse bg-grey1' />
                <div className='w-[30px] h-[15px] animate-pulse bg-grey1 rounded-lg'></div>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <div className='text-center pr-4 border-r border-accent3'>
                <p>Rooms Joined</p>
                <div className='w-[40px] h-[30px] animate-pulse bg-grey1 rounded-lg mx-auto' />
              </div>
              <div>
                <p>Problems Solved</p>
                <div className='w-[40px] h-[30px] animate-pulse bg-grey1 rounded-lg mx-auto' />
              </div>
            </div>
          </div>
        </div>

        <div className='text-center flex items-center gap-x-4'>
          <div className='w-[22px] h-[22px] animate-pulse bg-grey1 rounded-full' />
          <div className='w-[22px] h-[22px] animate-pulse bg-grey1 rounded-full' />
          <div className='w-[22px] h-[22px] animate-pulse bg-grey1 rounded-full' />
        </div>
      </div>

      <div className='max-sm:hidden relative flex flex-row items-center h-28 w-full rounded-3xl mt-10 p-12 bg-secondary'>
        <div className='animate-pulse bg-grey1 absolute flex items-center justify-center w-[80px] h-[80px] hover:cursor-pointer rounded-lg overflow-hidden shadow shadow-heading -top-12 left-1/2 -translate-x-1/2'></div>
        <div className='absolute animate-pulse bg-grey1 w-44 h-8 rounded-md bottom-2 left-1/2 -translate-x-1/2'></div>
        <div className='mr-auto flex items-center'>
          <div className='flex flex-col items-center px-6 mr-6 border-r border-accent3'>
            <p>Rooms Joined</p>
            <p className='animate-pulse bg-grey1 rounded-md h-12 w-16'></p>
          </div>
          <div className='flex flex-col items-center px-6'>
            <p>Problems Solved</p>
            <p className='animate-pulse bg-grey1 rounded-md h-12 w-16'></p>
          </div>
        </div>
        <div className='ml-auto flex items-center'>
          <div className='text-center px-6 mr-6 border-r border-accent3'>
            <p>Country</p>
            <div className='flex items-center justify-center gap-x-3'>
              <div className='animate-pulse bg-grey1 w-5 h-5 rounded-full'></div>
              <span className='animate-pulse bg-grey1 w-20 h-5 rounded-md'></span>
            </div>
          </div>
          <div className='text-center flex items-center gap-x-3'>
            <div className='animate-pulse bg-grey1 rounded-md w-12 h-12'></div>
            <div className='animate-pulse bg-grey1 rounded-md w-12 h-12'></div>
          </div>
        </div>
      </div>
      <div className='grid grid-rows-2 grid-cols-6 gap-6 grow mt-6'>
        <div className='row-span-2 col-span-2 max-xl:col-span-6 max-md:order-2 bg-secondary rounded-lg p-6'>
          <section className='mb-8'>
            <h2 className='uppercase font-bold text-xl mb-3 tracking-wider'>
              About
            </h2>
            <div className='max-w-[500px] animate-pulse bg-grey1 rounded-md h-6 w-full mb-1'></div>
            <div className='max-w-[500px] animate-pulse bg-grey1 rounded-md h-6 w-full mb-1'></div>
            <div className='max-w-[500px] animate-pulse bg-grey1 rounded-md h-6 w-full'></div>
          </section>
          <section className='mb-8'>
            <h2 className='uppercase font-bold text-xl mb-3 tracking-wider'>
              Skills
            </h2>
            <div className='flex flex-row gap-3 flex-wrap'>
              <div className='animate-pulse bg-grey1 w-20 h-6 px-3 rounded-md'></div>
              <div className='animate-pulse bg-grey1 w-20 h-6 px-3 rounded-md'></div>
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='uppercase font-bold text-xl mb-3 tracking-wider'>
              Friends
            </h2>
            <div className='flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer'>
              <div className='animate-pulse h-12 w-12 bg-grey1 rounded-full'></div>
              <div className='flex flex-col text-white leading-snug'>
                <h2 className='animate-pulse bg-grey1 w-32 h-6 mb-1 rounded-md'></h2>
                <p className='animate-pulse bg-grey1 w-14 h-6 rounded-md'></p>
              </div>
            </div>
            <div className='flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer'>
              <div className='animate-pulse h-12 w-12 bg-grey1 rounded-full'></div>
              <div className='flex flex-col text-white leading-snug'>
                <h2 className='animate-pulse bg-grey1 w-32 h-6 mb-1 rounded-md'></h2>
                <p className='animate-pulse bg-grey1 w-14 h-6 rounded-md'></p>
              </div>
            </div>
          </section>
          <button className='animate-pulse bg-grey1 mb-6 h-16 w-full px-3 py-4 rounded-lg'></button>
        </div>
        <div className='md:row-span-1 max-xl:col-span-3 col-span-2 max-md:col-span-6 max-md:order-3 animate-pulse bg-grey1 rounded-lg p-6 flex flex-col'>
          <div className='grid grid-rows-1 grid-cols-4 gap-x-1'></div>
          <div className='grow'></div>
        </div>
        <div className='md:row-span-1 row-span-full max-xl:col-span-3 col-span-2 max-md:col-span-6 max-md:order-1 bg-secondary rounded-lg p-6 flex flex-col gap-4'>
          <h1 className='text-grey1 font-bold'>Solved Problems</h1>
          <div className='flex flex-row max-[375px]:flex-col max-[375px]:gap-4 gap-2 items-center justify-center w-full grow'>
            <div className='flex flex-row items-center max-[375px]:order-2 justify-center gap-x-6 grow'>
              <div className='flex flex-col gap-y-1 items-center'>
                <div className='h-56 w-14 rounded-xl overflow-clip animate-pulse bg-grey1 relative'></div>
                <p>E</p>
              </div>
              <div className='flex flex-col gap-y-1 items-center'>
                <div className='h-56 w-14 rounded-xl overflow-clip animate-pulse bg-grey1 relative'></div>
                <p>M</p>
              </div>
              <div className='flex flex-col gap-y-1 items-center'>
                <div className='h-56 w-14 rounded-xl overflow-clip animate-pulse bg-grey1 relative'></div>
                <p>H</p>
              </div>
            </div>
            <div className='grow'>
              <div className='flex flex-col items-center justify-center h-52 w-52 rounded-full border-8 animate-pulse border-grey1 m-auto'>
                <div className='animate-pulse bg-grey1 rounded-md h-14 w-24'></div>
                <p>solved</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-4 max-xl:col-span-6 max-md:order-4 bg-secondary rounded-lg p-6'>
          <div className='flex flex-row gap-x-3 mb-6'>
            <button className='px-3 py-1 rounded-lg bg-accent3'>
              Recent Submissions
            </button>
            <button className='px-3 py-1 rounded-lg'>Created Rooms</button>
          </div>
          <div className='flex flex-col'>
            <div className='animate-pulse bg-grey1 rounded-md w-full h-16 mb-3'></div>
            <div className='animate-pulse bg-grey1 rounded-md w-full h-16'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
