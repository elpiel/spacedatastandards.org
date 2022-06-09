import { Writable, writable } from "svelte/store";
//@ts-ignore
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import { PackageFile, Repository } from "@/classes/package_file";
import localForage from "localforage";
export const octokit = new Octokit();

export const ownerObject: Repository = new Repository();

export const standards: Writable<Array<PackageFile>> = writable([]);

export const getStandards = async (): Promise<void> => {
    let data: any = await localForage.getItem("Standards");
    if (!data?.length) {
        data = (await octokit.rest.repos.getContent(ownerObject)).data;
        localForage.setItem("Standards", data);
    }
    standards.set(data);
}