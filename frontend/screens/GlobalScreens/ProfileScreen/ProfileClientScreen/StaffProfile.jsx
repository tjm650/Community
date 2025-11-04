import React from "react";
import { StyleSheet, View } from "react-native";
import ProfileDetails from "../ProfileDetails";

const StaffProfile = ({
  cellDetails,
  profession,
  profInitials,
  serviceName,
  email,
  bio,
  program,
  username,
}) => {
  return (
    <View>
      {/* <ProfileDetails
        inforStatus={"Username"}
        icon={"user"}
        details={username}
      /> */}

      {profession && (
        <ProfileDetails
          inforStatus={"Profession"}
          icon={"user-graduate"}
          details={profession}
        />
      )}

      {profInitials && (
        <ProfileDetails
          inforStatus={"Prof Initial"}
          icon={"graduation-cap"}
          details={profInitials}
        />
      )}

      {serviceName && (
        <ProfileDetails
          inforStatus={"Related Services"}
          icon={"industry"}
          details={serviceName}
        />
      )}

      {program && (
        <ProfileDetails
          inforStatus={"Program"}
          icon={"book"}
          details={program}
        />
      )}

      {/* <ProfileMoreDetails
        link={true}
        inforStatus={"Network Links"}
        Inicon={"link"}
        details={networkLink}
      /> */}

      {cellDetails && (
        <ProfileDetails
          inforStatus={"Cell"}
          icon={"phone"}
          details={cellDetails}
        />
      )}

      {/* {email && (
        <ProfileDetails
          link={true}
          inforStatus={"Email"}
          icon={"link"}
          details={email}
        />
      )} */}

      {bio && (
        <ProfileDetails inforStatus={"Bio"} icon={"info"} details={bio} />
      )}

      {/* <InforClasiffier infor={"Specifications"} /> */}

      {/* <ProfileMoreDetails
        inforStatus={"Qualifications"}
        Inicon={"link"}
        details={qualification}
      />

      <ProfileMoreDetails
        inforStatus={"Researches"}
        Inicon={"link"}
        details={Research}
      /> */}
    </View>
  );
};

export default StaffProfile;

const styles = StyleSheet.create({});
