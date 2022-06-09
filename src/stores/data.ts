//@ts-nocheck
import { Writable, writable, get } from "svelte/store";
import { Octokit } from "@octokit/rest";
import { PackageFile, Repository } from "@/classes/package_file";
import localForage from "localforage";

export let sTimeout = 1000 * 60 * 60 * 30;
let storageKey = "Standards";
let timeStampKey = "Standards:timestamp";
export let last: Writable<any> = writable(0);
export const octokit = new Octokit();

export const ownerObject: Repository = new Repository();

export const standards: Writable<Array<PackageFile>> = writable([]);

export const getStandards = async (): Promise<void> => {
    let data: any = await localForage.getItem(storageKey);
    last.set(await localForage.getItem(timeStampKey));
    let _last = get(last);
    if (!data?.length || !_last || Date.now() > sTimeout + _last) {
        data = (await octokit.rest.repos.getContent(ownerObject)).data;
        localForage.setItem(storageKey, data);
        localForage.setItem(timeStampKey, Date.now());
    }
    standards.set(data);
}