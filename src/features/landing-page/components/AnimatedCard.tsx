/* eslint-disable @typescript-eslint/no-explicit-any */
import './animated-card.css'
interface CardProps {
  title: string

  icon: any
}
const CardWithAnimation = ({ title, icon }: CardProps) => {
  return (
    <div className='an-card bg-background shadow-md max-w-xl min-h-[250px] flex items-center'>
      <div>
        <h4 className='!text-foreground text text-3xl font-bold'>{title}</h4>
        <div className='flex justify-evenly mt-2'>
          <span className='icon'>
            <div>{icon}</div>
          </span>
          <span className='icon'>
            <div>{icon}</div>
          </span>
          <span className='icon'>
            <div>{icon}</div>
          </span>
          <span className='icon'>
            <div>{icon}</div>
          </span>
        </div>
      </div>
      {/* <p>{description}</p> */}
      <div className='shine'></div>
      <div className='background'>
        <div className='tiles'>
          <div className='tile tile-1'></div>
          <div className='tile tile-2'></div>
          <div className='tile tile-3'></div>
          <div className='tile tile-4'></div>

          <div className='tile tile-5'></div>
          <div className='tile tile-6'></div>
          <div className='tile tile-7'></div>
          <div className='tile tile-8'></div>

          <div className='tile tile-9'></div>
          <div className='tile tile-10'></div>
        </div>

        <div className='line line-1'></div>
        <div className='line line-2'></div>
        <div className='line line-3'></div>
      </div>
    </div>
  )
}

export default CardWithAnimation
