// https://github.com/protectwise/troika/tree/master/packages/troika-three-text
import React from 'react';
import { Text } from 'drei';

const defaultFont = `https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff`;

export default function TitleText() {
    return (
        <>
        <group name="groupTitleText" position={[0,-0.5,-1]}>
            <Text
                color={'#FFF'} // default
                textAlign={'center'}
                fontSize={1}
                position={[0,2,0]}
                font={defaultFont}
            >
                WELLCOME
            </Text>

            <Text
                color={'#FFF'} // default
                textAlign={'center'}
                fontSize={1}
                position={[0,1,0]}
                font={defaultFont}
            >
                TO MY
            </Text>

            <Text
                color={'#FFF'} // default
                textAlign={'center'}
                fontSize={1}
                position={[0,0,0]}
                font={defaultFont}
            >
                PORTFOLIO
            </Text>
        </group>
        </>
    );
  }

// export default function TitleText() {
//     return (
//       <Box
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         width="100%"
//         height="100%"
//       >
//         <Box margin={0.05}>
//           <Text fontSize={0.3} letterSpacing={0.1}>
//             WELLCOME
//             <meshStandardMaterial />
//           </Text>
//         </Box>
//         <Box margin={0.05}>
//           <Text fontSize={0.3} letterSpacing={0.1}>
//             TO MY
//             <meshStandardMaterial />
//           </Text>
//         </Box>
//         <Box margin={0.05}>
//           <Text fontSize={0.3} letterSpacing={0.1}>
//             PORTFOLIO
//             <meshStandardMaterial />
//           </Text>
//         </Box>
//       </Box>
//     );
//   }