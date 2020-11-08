import { ApolloClient, InMemoryCache, HttpLink, from, WatchQueryFetchPolicy } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// import { toast } from 'react-toastify';
import localforage from 'localforage';
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
// import QueueLink from 'apollo-link-queue';
// import SerializingLink from 'apollo-link-serialize';
// import { RetryLink } from 'apollo-link-retry';
// import updateFunctions from '../graphql/updateFunctions';

interface ApolloClientConfigAttributes {
    authorization: string;
    fetchPolicy?: WatchQueryFetchPolicy;
}

export interface ITrackedQuery {
    queryJSON: string;
    contextJSON: string;
    variablesJSON: string;
    operationName: string;
}

export const getApolloClient = async (attrs: ApolloClientConfigAttributes) => {
    console.log(`[Attrs]: `, attrs);
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        // if (graphQLErrors) {
        //   graphQLErrors.forEach(({ message, locations, path }) => {
        //     console.log(
        //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        //     );
        //     toast.error(
        //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        //     );
        //   });
        // }

        if (networkError) {
            console.log(`[Network error]: ${networkError.message}`);
            // toast.error(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        headers: {
            authorization: attrs.authorization,
        },
    });

    // const retryLink = new RetryLink({ attempts: { max: Infinity } })

    // const queueLink = new QueueLink();

    // const openQueueLink = () => queueLink.open();
    // const closeQueueLink = () => queueLink.close();
    // window.addEventListener('offline', closeQueueLink);
    // window.addEventListener('online', () => openQueueLink);

    // const unsubscribeQueue = () => {
    //     window.removeEventListener('offline', closeQueueLink);
    //     window.removeEventListener('online', openQueueLink);
    // }

    // const serializingLink = new SerializingLink();

    // const trackerLink = new ApolloLink((operation, forward) => {
    //     if (!forward) {
    //         return null;
    //     }

    //     console.log(operation);
    //     console.log(forward);

    //     const context = operation.getContext();
    //     console.log(`[context]: `, context);

    //     const trackedQueries: ITrackedQuery[] = JSON.parse(window.localStorage.getItem('trackedQueries') as string) || [];

    //     console.log(`[before new req]: `, trackedQueries);
    //     if (context.tracked !== undefined) {
    //         const { operationName, query, variables } = operation

    //         try {
    //             const newTrackedQuery = {
    //                 queryJSON: JSON.stringify(query),
    //                 contextJSON: JSON.stringify({ tracked: context.tracked, serializationKey: context.serializationKey }),
    //                 variablesJSON: JSON.stringify(variables),
    //                 operationName,
    //             };

    //             console.log('[new tracked query]: ', newTrackedQuery);
    //             window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]));
    //             console.log(`[added new req]: `, newTrackedQuery, "\n[new query list]: ", [...trackedQueries, newTrackedQuery]);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }



    //     return forward(operation).map((data) => {
    //         if (context.tracked !== undefined) {
    //             window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries));
    //             console.log(`[setting in local forage]: `, trackedQueries);
    //         }

    //         return data;
    //     });
    // });

    const link = from([
        // trackerLink,
        // queueLink as unknown as ApolloLink,
        // serializingLink as unknown as ApolloLink,
        // retryLink as unknown as ApolloLink,
        errorLink,
        httpLink,
    ]);

    console.log(`[Initializing cache]`);
    const cache = new InMemoryCache({ resultCaching: true });

    const localDB = localforage.createInstance({
        storeName: localforage.INDEXEDDB,
    });

    console.log(`[persisting cache]`);
    await persistCache({
        cache,
        storage: localDB as PersistentStorage,
    });

    console.log(`[Initializing apollo client]`);
    const client = new ApolloClient({
        link: link,
        connectToDevTools: true,
        cache: cache,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: attrs.fetchPolicy,
                errorPolicy: "all",
            },
            mutate: {
                fetchPolicy: "no-cache",
            }
        },
    });

    return { client, /*unsubscribeQueue*/ };
}

// export const executeTrackedQueries = async (apolloClient: ApolloClient<NormalizedCacheObject>) => {
//     const trackedQueries: ITrackedQuery[] = JSON.parse(window.localStorage.getItem('trackedQueries') as string) || [];

//     const promises = trackedQueries.map(({ variablesJSON, queryJSON, contextJSON, operationName }) => apolloClient.mutate({
//         context: JSON.parse(contextJSON),
//         variables: JSON.parse(variablesJSON),
//         mutation: JSON.parse(queryJSON),
//         update: updateFunctions[operationName],
//         optimisticResponse: JSON.parse(contextJSON).optimisticResponse,
//     }));

//     try {
//         await Promise.all(promises);
//     } catch (error) {
//         console.log({ error });
//         toast.error(`Error executing tracked queries: ${error}`);
//     }

//     window.localStorage.setItem('trackedQueries', JSON.stringify([]));
// }