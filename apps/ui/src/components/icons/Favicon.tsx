import { ComponentProps, FC } from 'react';
import { chakra, useTheme } from '@chakra-ui/react';

type FaviconProps = ComponentProps<typeof chakra.svg>;

const Favicon: FC<FaviconProps> = (props) => {
  const theme = useTheme();
  const { black, green, yellow } = theme.colors;

  return (
    <chakra.svg boxSize={16} viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect fill={green[900]} height={64} rx={8} width={64} />
      <circle cx={32} cy={32} fill={yellow[500]} r={24} stroke={black} />
      <path d='M30 50H34V14L30 14V50Z' fill={yellow[600]} stroke={black} strokeLinejoin='round' />
      <path
        d='M42 41L50 37L22 23L14 27L42 41Z'
        fill={yellow[600]}
        stroke={black}
        strokeLinejoin='round'
      />
      <path
        d='M26 33L14 27L38 15L50 21L26 33Z'
        fill={yellow[700]}
        stroke={black}
        strokeLinejoin='round'
      />
      <path
        d='M26 49L14 43L38 31L50 37L26 49Z'
        fill={yellow[700]}
        stroke={black}
        strokeLinejoin='round'
      />
    </chakra.svg>
  );
};

export default Favicon;
