import { Writable, writable } from "svelte/store";
//@ts-ignore
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import { PackageFile, Repository } from "@/classes/package_file";
import localForage from "localforage";

export let sTimeout = 1000 * 60 * 60 * 30;
let storageKey = "Standards";
let timeStampKey = "Standards:timestamp";
export let last: any = 0;
export const octokit = new Octokit();

export const ownerObject: Repository = new Repository();

export const standards: Writable<Array<PackageFile>> = writable([]);

export const getStandards = async (): Promise<void> => {
    let data: any = await localForage.getItem(storageKey);
    last = await localForage.getItem(timeStampKey);
    if (!data?.length || !last || Date.now() > sTimeout + last) {
        data = (await octokit.rest.repos.getContent(ownerObject)).data;
        localForage.setItem(storageKey, data);
        localForage.setItem(timeStampKey, Date.now());
    }
    standards.set(data);
}