/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card'
import './animated-card.css'
import { useTheme } from '@/components/theme-provider'
interface CardProps {
  title: string
  icon: any
}

const CardWithAnimation = ({ title, icon }: CardProps) => {
  const { theme } = useTheme()
  return (
    <Card
      className={`an-card glassy bg-background border ${
        theme === 'light' ? 'border-border/50' : 'border-border'
      } shadow-md max-w-xl min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Content */}
      <div className='text-center p-6 z-20'>
        <h4
          className={`text-foreground tracking-wide text-3xl font-bold mb-4 `}
        >
          {title}
        </h4>
        <div className='flex items-center justify-between mt-4'>
          {icon.map(
            (icon: {
              src: string | undefined
              name: string | undefined
              alt: string | undefined
            }) => (
              <div
                key={icon.alt}
                className='flex-col-center  transition-transform duration-300 hover:scale-110 hover:!rotate-3'
              >
                <img className='size-16 mb-2' src={icon.src} alt={icon.alt} />
                <p
                  className={`text-sm ${
                    theme === 'light' ? 'text-theme-variant' : 'text-foreground'
                  } font-bold text-center lg:max-w-[100px] max-w-[80px]`}
                >
                  {icon.name}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Shine Effect */}
      <div
        className={`shine absolute inset-0 bg-gradient-to-r ${
          theme === 'dark' &&
          'from-theme-variant/20 via-theme-variant/30 to-theme-variant/40'
        } opacity-0 transition-opacity duration-500 hover:opacity-100`}
      ></div>

      {/* Background Tiles and Lines */}
      <div className='background absolute inset-0 overflow-hidden'>
        <div className='tiles absolute inset-0'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`tile tile-${i + 1} ${
                theme === 'dark' &&
                'bg-theme-variant/10 border-theme-variant/20'
              }`}
            ></div>
          ))}
        </div>

        <div className='lines absolute inset-0'>
          <div
            className={`line line-1 ${
              theme === 'dark' ? 'bg-theme-variant/10' : ''
            }`}
          ></div>
          <div
            className={`line line-2 ${
              theme === 'dark' ? 'bg-theme-variant/10' : ''
            }`}
          ></div>
          <div
            className={`line line-3 ${
              theme === 'dark' ? 'bg-theme-variant/10' : ''
            }`}
          ></div>
        </div>
      </div>
    </Card>
  )
}

export default CardWithAnimation
