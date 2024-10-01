import { useQuery, useQueryClient } from "@tanstack/react-query";


const repositoriesKey = (name) => {
    return ['repositories', name || null];
};

const languagesKey = (url) => {
    return ['languages', url];
};

const getRepositories = async (name) => {
    const fetchUrl = name 
        ? `https://api.github.com/repos/godaddy/${name}`
        : "https://api.github.com/orgs/godaddy/repos?per_page=100";
    return fetch(fetchUrl)
        .then(response => response.json());
};

const getRepositoryByName = (queryClient, name) => {
    const repository = queryClient.getQueryData(repositoriesKey())?.find((i) => i.name === name);
    return repository;
};

const getLanguagesByUrl = async (url) => {
    return fetch(url)
        .then(response => response.json());
};

export const useRepositories = (name) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: repositoriesKey(name), 
        queryFn: async () => {
            const repositories = await getRepositories(name);
            return repositories;
        },
        initialData: () => name && getRepositoryByName(queryClient, name),
        staleTime: Infinity
    });
};

export const useLanguages = (url, enabled = false) => {
    return useQuery({
        queryKey: languagesKey(url), 
        queryFn: () => getLanguagesByUrl(url),
        staleTime: Infinity,
        enabled
    });
};

