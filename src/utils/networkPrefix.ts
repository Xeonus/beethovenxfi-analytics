import { FantomNetworkInfo, NetworkInfo } from './../constants/networks';

export function networkPrefix(activeNewtork: NetworkInfo) {
    const isFtm = activeNewtork === FantomNetworkInfo;
    if (isFtm) {
        return '/';
    }
    const prefix = '/' + activeNewtork.route.toLocaleLowerCase() + '/';
    return prefix;
}
