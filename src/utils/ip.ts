import { IpInfo } from "../features/ip/types";

export const getLocationNameByIp = (ip?: IpInfo): string => {
  if (!ip?.success) return 'Unknown Location 🌍';

  const parts = [
    ip.city,
    ip.region && ip.region !== ip.city ? ip.region : null, // avoid duplicates
    ip.country,
  ].filter(Boolean);

  const location = parts.join(', ');

  return `${location} ${ip.flag?.emoji ?? ''}`.trim();
};