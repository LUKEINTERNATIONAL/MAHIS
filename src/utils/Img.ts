import { getFileConfig2 } from "@/utils/GeneralUti"

export default function img(name: string) {
    getFileConfig2()
    const baseURL = localStorage.baseURL;
    return `/mahis/images/${name}`;
}
