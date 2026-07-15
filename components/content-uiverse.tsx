"use client";

import React from "react";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import {
  DataScrape,
  extractScrapes,
  ScrapeSelector
} from "@/lib/extract-scrapes";
import { x } from "xuxi";
import axios from "axios";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://uiverse.io/profile/ilkhoeri/approved";

async function getContent({
  result,
  sub
}: {
  result: DataScrape;
  sub: Array<DataScrape>;
}) {
  const res = await axios.get(targetUrl);
  const $ = cheerio.load(res.data);

  const config1: ScrapeSelector = {
    container: "main",
    children: [
      {
        container: "section.content"
      }
    ]
  };

  const scrapes1 = extractScrapes($, config1);

  result = {
    title: `Title`,
    sub: [...sub, ...scrapes1]
  };

  return x.clean(result);
}

export function useScrapeInfo(info: any) {
  const [data, setData] = React.useState<DataScrape | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  let result: DataScrape = {},
    sub: Array<DataScrape> = [];

  React.useEffect(() => {
    if (!info) {
      setData(null);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const ctn = await getContent({ result, sub });
        setData(ctn);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { result, sub, error, data, loading };
}

export const UiverseContent = () => {
  const { data, loading } = useScrapeInfo("info");

  return (
    <div>
      <h1>Uiverse Profile (Client-side)</h1>
      {data?.title}
      {data?.description}
      {data?.sub?.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};
