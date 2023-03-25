import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { useDispatch, useSelector } from "react-redux";
import { getJobsDispatch } from "../../../app/redux/jobsReducer/jobsThunk";
const Popularjobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector((state) => state.jobsData);
  useEffect(() => {
    dispatch(
      getJobsDispatch({
        endPoint: "search",
        query: {
          query: "React developer",
          num_pages: 1,
        },
      })
    );
  }, []);
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const handlePress = (item) => {};
  console.log({ jobs, error, isLoading });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text> Somting Went Wrong</Text>
        ) : (
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <PopularJobCard
                selectedJob={selectedJob}
                handleCardPress={handlePress}
                item={item}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
