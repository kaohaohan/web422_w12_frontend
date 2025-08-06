import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const authCheck = useCallback(
    (url) => {
      const path = url.split("?")[0];
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    },
    [router]
  );

  const updateAtoms = useCallback(async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }, [setFavouritesList, setSearchHistory]);

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [authCheck, router.events, router.pathname, updateAtoms]);

  return <>{authorized && props.children}</>;
}
