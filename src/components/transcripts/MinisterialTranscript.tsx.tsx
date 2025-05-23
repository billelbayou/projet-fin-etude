"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#eeeeee",
    padding: 4,
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
  },
});

const MyTable = () => (
  <View style={styles.table}>
    {/* Header Row */}
    <View style={styles.tableRow}>
      <View style={styles.tableColHeader}>
        <Text style={styles.tableCellHeader}>Name</Text>
      </View>
      <View style={styles.tableColHeader}>
        <Text style={styles.tableCellHeader}>Age</Text>
      </View>
      <View style={styles.tableColHeader}>
        <Text style={styles.tableCellHeader}>City</Text>
      </View>
    </View>
    {/* Data Rows */}
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Alice</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>24</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Algiers</Text>
      </View>
    </View>
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Bob</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>30</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Oran</Text>
      </View>
    </View>
  </View>
);

// Ministerial Transcript Component
interface MinisterialTranscriptProps {
  releveId: { id: string };
}

export const MinisterialTranscript = ({
  releveId,
}: MinisterialTranscriptProps) => {
  const [transcript, setTranscript] = useState(null);
  useEffect(() => {
    const fetchTranscript = async () => {
      const { id } = releveId;
      try {
        const response = await fetch(`/api/transcripts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTranscript(data.data);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    };
    fetchTranscript();
  }, [releveId]);
  console.log(transcript);
  if (!transcript) {
    return <Text>Loading...</Text>;
  }
  return (
    <Document>
      <Page size="A4">
        <MyTable />
      </Page>
    </Document>
  );
};
