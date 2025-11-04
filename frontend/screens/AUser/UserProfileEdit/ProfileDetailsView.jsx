import RBOptionsSheet from "@/screens/GlobalScreens/RBSheets/RBOptionsSheet";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileEditView from "./ProfileEditView";
import UserDetailView from "./UserDetailView";

const ProfileDetailsView = ({
  cellDetails,
  profession,
  profInitials,
  serviceName,
  email,
  bio,
  program,
  username,
  name,
  setIsFailed,
  setIsFailedError,
  ds1,
}) => {
  const [modfirstName, setModFirstName] = useState("");
  const [modLastName, setModLastName] = useState("");
  const [modUsername, setModUsername] = useState("");
  const [modBio, setModeBio] = useState("");
  const [modProfInitial, setModProfIinitial] = useState("");
  const [modProfession, setModProfession] = useState("");
  const [modProgram, setModProgram] = useState("");
  const [modServiceId, setModServiceId] = useState("");
  const [modCell, setModCell] = useState("");

  const RenderView = ({
    inforStatus,
    icon,
    details,
    height,
    value,
    value2,
    label,
    label2,
    placeholder2,
    setValue,
    setValue2,
    action,
    SecondModView,
    link,
    uneditable = false,
  }) => {
    const Sheet = useRef([]);

    return !uneditable ? (
      <RBOptionsSheet
        CommmentSheet={Sheet}
        GetIcon={
          <UserDetailView
            inforStatus={inforStatus}
            icon={icon}
            details={details}
            link={link}
          />
        }
        GetView={
          <ProfileEditView
            label={label}
            iconType={icon}
            value={value}
            setValue={setValue}
            placeholder={details}
            height={height}
            setValue2={setValue2}
            value2={value2}
            label2={label2}
            placeholder2={placeholder2}
            SecondModView={SecondModView}
            action={action}
            setIsFailed={setIsFailed}
            setIsFailedError={setIsFailedError}
          />
        }
        height={"auto"}
      />
    ) : (
      <UserDetailView
        inforStatus={inforStatus}
        icon={icon}
        details={details}
        link={link}
        uneditable= {uneditable}
      />
    );
  };

  return (
    <View>
      <RenderView
        link={true}
        inforStatus={"Status"}
        icon={"at"}
        details={ds1}
        uneditable={true}
      />

      <RenderView
        link={true}
        inforStatus={"Email"}
        icon={"link"}
        details={email}
        uneditable={true}
      />

      <RenderView
        label={"username"}
        inforStatus={"Username"}
        icon={"user"}
        details={username}
      />

      <RenderView
        inforStatus={"Name"}
        label={"first name"}
        label2={"last name"}
        icon={"user"}
        details={name}
        value={modfirstName}
        setValue={setModFirstName}
        SecondModView={true}
        setValue2={setModLastName}
        value2={modLastName}
        action={"first_name"}
      />

      <RenderView
        inforStatus={"Profession"}
        icon={"user-graduate"}
        details={profession ? profession : ""}
        label={"profession"}
        value={modProfession}
        setValue={setModProfession}
        action={"profession"}
      />

      <RenderView
        inforStatus={"Prof Initial"}
        icon={"graduation-cap"}
        details={profInitials ? profInitials : "."}
        label={"Prof Initial"}
        value={modProfInitial}
        setValue={setModProfIinitial}
        action={"prof_initial"}
      />

      <RenderView
        inforStatus={"Related Service"}
        icon={"industry"}
        details={serviceName ? serviceName : "."}
        label={"Related Service"}
        value={modServiceId}
        setValue={setModServiceId}
        action={"service_name"}
      />

      <RenderView
        inforStatus={"Program"}
        icon={"book"}
        details={program ? program : "."}
        label={"Program"}
        value={modProgram}
        setValue={setModProgram}
        action={"program"}
      />

      <RenderView
        link={true}
        inforStatus={"Cell"}
        icon={"phone"}
        details={cellDetails ? cellDetails : "."}
        label={"Cell"}
        value={modCell}
        setValue={setModCell}
        action={"cell"}
      />

      <RenderView
        inforStatus={"Bio"}
        icon={"info"}
        details={bio ? bio : "."}
        height={"auto"}
        label={"Bio"}
        value={modBio}
        setValue={setModeBio}
        action={"bio"}
      />
    </View>
  );
};

export default ProfileDetailsView;

const styles = StyleSheet.create({});
