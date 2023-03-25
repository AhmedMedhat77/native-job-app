import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Provider } from "react-redux";
import { store } from "../../../app/redux/store/store";
import { SIZES } from "../../../constants";

import styles from "./tabs.style";
const TabButton = ({ name, activeTab, onHandleSearch }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearch}
  >
    <Text style={styles.btnText(name, activeTab)}> {name}</Text>
  </TouchableOpacity>
);
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <FlatList
          data={tabs}
          renderItem={({ item }) => (
            <TabButton
              name={item}
              activeTab={activeTab}
              onHandleSearch={activeTab}
              horizontal
              showHorizontalScrollIndicator={false}
              contentContainerStyle={{ ColumnGap: SIZES.small / 2 }}
            />
          )}
        />
      </View>
    </Provider>
  );
};

export default Tabs;
