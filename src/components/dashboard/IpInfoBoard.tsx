import * as React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { DashboardProps } from '../../navigation/types';
import { getLocationNameByIp } from '../../utils/ip';
import { IpInfo } from '../../features/ip/types';

const IpInfoBoard = ({ipInfoData}: {ipInfoData?:IpInfo}) => {
  const { fonts } = useTheme();

  const ipData = [
    {
      id: 'ip_address',
      title: 'IP Address',
      caption: ipInfoData?.ip || '-',
    },
    {
      id: 'location',
      title: 'Location',
      caption: getLocationNameByIp(ipInfoData),
    },
    {
      id: 'time_zone',
      title: 'Time Zone',
      caption: '192.168.363',
    },
    {
      id: 'isp',
      title: 'ISP',
      caption: '192.168.363',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        padding: 10,
        backgroundColor: 'black',
      }}
    >
      {ipData.map(item => {
        return (
          <View
            key={item.id}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                ...fonts.bold,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                ...fonts.regular,
                marginTop: 5,
              }}
            >
              {item.caption}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default IpInfoBoard;
