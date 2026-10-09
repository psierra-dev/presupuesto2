"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
//import { PDFViewer } from "@react-pdf/renderer";

import {BiDownload} from "react-icons/bi";
import {FiLoader} from "react-icons/fi";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    width: "100vw",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    width: "100%",
  },
  column: {
    width: "50%",
    padding: 5,
    fontSize: 10,
  },
});

type BudgetJob = {name: string; total_labour: number};
type Budget = {
  budget_job: BudgetJob[];
  total: number;
};
const MyDocument = ({data}: {data: Budget}) => {
  return (
    <Document style={{width: "100%"}}>
      <Page size="A4" style={styles.page} key={"presupuesto-1"}>
        <View
          style={{
            backgroundColor: "#b9b9b9",
            color: "#fffff",
            flexDirection: "row",
            textDecorationColor: "#ffffff",
          }}
        >
          <View style={styles.column}>
            <Text>Nombre</Text>
          </View>
          <View style={{...styles.column, alignItems: "flex-end"}}>
            <Text>Precio</Text>
          </View>
        </View>

        {data.budget_job?.map((d: any) => (
          <View key={d.id} style={styles.row}>
            <View style={styles.column}>
              <Text>{d?.name}</Text>
            </View>
            <View style={{...styles.column, alignItems: "flex-end"}}>
              <Text>${d?.total_labour}</Text>
            </View>
          </View>
        ))}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            fontSize: 10,
            padding: 5,
            backgroundColor: "#d1e3fd",
          }}
        >
          <Text>Total</Text>
          <Text>${data.total}</Text>
        </View>
      </Page>
    </Document>
  );
};
/*<PDFDownloadLink document={<MyDocument data={data}/>} fileName="test.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>*/
/* <PDFViewer>
      <MyDocument data={data} />
    </PDFViewer> */

const DownloadLink = PDFDownloadLink as any;

const PdfCointainer = ({data}: {data: Budget}) => {
  return (
    <DownloadLink
      document={<MyDocument data={data} />}
      fileName="presupuesto.pdf"
    >
      {({blob, url, loading, error}: any) =>
        loading ? (
          <span className="text-center text-sm animate-spin">
            <FiLoader />
          </span>
        ) : (
          <button className="text-xl rounded-full p-1 hover:bg-neutral-300">
            <BiDownload />
          </button>
        )
      }
    </DownloadLink>
  );
};
export default PdfCointainer;
