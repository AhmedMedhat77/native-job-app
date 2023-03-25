import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { COLORS, icons, SIZES } from "../../constants";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Company,
  ScreenHeaderBtn,
  JobFooter,
  JobTabs,
  JobAbout,
} from "../../components";

import {  useDispatch, useSelector } from "react-redux";
import { getJobDetailsDispatch } from "../redux/jobDetailsSlice/jobDetailsThunk";
const tabs = ["About", "Qualifications", "Responsiblites"];
const JobDetails = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const params = useSearchParams();
  const router = useRouter();
  const { JobDetails, isLoading, error } = useSelector(
    (state) => state.jobDetailsData
  );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getJobDetailsDispatch({
        endPoint: "job-detail",
        query: {
          job_id: params.id,
        },
      })
    );
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {};
  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.white },
            headerShadwoVisable: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
            ),
            headerTitle: "",
          }}
        />
        <React.Fragment>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {isLoading ? (
              <ActivityIndicator size={"large"} color={COLORS.primary} />
            ) : error ? (
              <Text>SomeThing Went Wrong</Text>
            ) : JobDetails.length === 0 ? (
              <Text>No Data </Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={JobDetails[0].emplyer_logo}
                  jobTitle={JobDetails[0].job_title}
                  companyName={JobDetails[0].emplyer_name}
                  location={JobDetails[0].job_country}
                />
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </View>
            )}
          </ScrollView>
        </React.Fragment>
      </SafeAreaView>
    
  );
};

export default JobDetails;
