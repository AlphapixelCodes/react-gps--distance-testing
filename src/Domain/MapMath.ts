export class LongLat {
    public longitude: number;
    public latitude: number
    constructor(lng: number, lat: number) {
        this.latitude = lat;
        this.longitude = lng;
    }
}

export function generatePoints(p1: string, p2: string, interval: number) {
    const point1 = parseDms(p1);
    const point2 = parseDms(p2);

    const lat = getLowestAndHighest(point1.latitude, point2.latitude);
    const lng = getLowestAndHighest(point1.longitude, point2.longitude);
    let ret: LongLat[] = [];
    for (let lat2 = lat.lowest; lat2 < lat.highest; lat2 += interval) {
        for (let lng2 = lng.lowest; lng2 < lng.highest; lng2 += interval) {
            {
                ret.push({ latitude: lat2, longitude: lng2 });
            }
        }
    }

    return ret;//

}
function getLowestAndHighest(num1: number, num2: number): { lowest: number; highest: number } {
    const lowest = num1 < num2 ? num1 : num2;
    const highest = num1 > num2 ? num1 : num2;
    return { lowest, highest };
}



// Function to parse DMS string and convert to decimal degrees
function parseDms(dmsString: string): LongLat {
    const dmsRegex = /(\d+)°(\d+)'([\d.]+)"([NSEW])/g;
    let match;
    const coords: { degrees: number; minutes: number; seconds: number; direction: string }[] = [];

    while ((match = dmsRegex.exec(dmsString)) !== null) {
        const degrees = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = parseFloat(match[3]);
        const direction = match[4];
        coords.push({ degrees, minutes, seconds, direction });
    }

    function dmsToDecimal({ degrees, minutes, seconds, direction }: { degrees: number; minutes: number; seconds: number; direction: string }): number {
        let decimal = degrees + minutes / 60 + seconds / 3600;
        if (direction === 'S' || direction === 'W') {
            decimal *= -1; // Make negative if direction is South or West
        }
        return decimal;
    }

    const latitude = dmsToDecimal(coords[0]);
    const longitude = dmsToDecimal(coords[1]);

    return new LongLat( longitude,latitude);
}

export function getDistanceKm(p1: LongLat, p2: LongLat) {
    return haversineDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
}

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}



export function KmToMiles(km: number ){
 return km * 0.621371
}