export type GetIpInfoArg = {
    ip?:string
};

export type GetIpInfoRes = {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: {
    img: string;
    emoji: string;
    emoji_unicode: string;
  };
  connection: {
    asn: number;
    org: string;
    isp: string;
    domain: string;
  };
  timezone: {
    id: string;
    abbr: string;
    is_dst: boolean;
    offset: number;
    utc: string;
    current_time: string;
  };
};

export type IpInfo = GetIpInfoRes;

export type CarouselImage = {
  id:string,
  image:string
}

export type MarketData = {
    "e": "aggTrade",
    "E": 1761306176309,
    "s": "BTCUSDT",
    "a": 3717439833,
    "p": "110987.92000000",
    "q": "0.00270000",
    "f": 5386061726,
    "l": 5386061729,
    "T": 1761306176309,
    "m": true,
    "M": true
}