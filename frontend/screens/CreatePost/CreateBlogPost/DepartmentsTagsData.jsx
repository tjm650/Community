import React from "react";
import { StyleSheet, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import CreatePostRBSheet from "../PostMethods/CreatePostRBSheet";
import DepartmentView from "./DepartmentView";
import TagsView from "./TagsView";

const DepartmentsTagsData = ({
  handleSelectDpts,
  handleSelecttags,
  Selectedtags,
  SelectedDepartments,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const directoryList = useGlobal((state) => state.directoryList);
  const ConnectList = useGlobal((state) => state.ConnectList);
  const user = useGlobal((state) => state.user);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <CreatePostRBSheet
          SheetName={"Blogers"}
          Data={directoryList}
          renderItem={({ item }) =>
            item.directory_status1 === "Bloger" &&
            item.creator.username === user.username ? (
              <DepartmentView
                item={item}
                handleSelect={(item) => handleSelectDpts(item)}
                SelectedDepartments={SelectedDepartments}
              />
            ) : (
              ""
            )
          }
        />

        <CreatePostRBSheet
          SheetName={"tags"}
          Data={ConnectList}
          renderItem={({ item }) => (
            <TagsView
              item={item}
              handleSelect={(item) => handleSelecttags(item)}
              selectedtags={Selectedtags}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DepartmentsTagsData;

const styles = StyleSheet.create({});
