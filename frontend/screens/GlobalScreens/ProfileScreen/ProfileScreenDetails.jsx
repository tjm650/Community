import useGlobal from "@/assets/common/core/useGlobal";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import StaffProfile from "./ProfileClientScreen/StaffProfile";
import StudentProfile from "./ProfileClientScreen/StudentProfile";
import OrganizationProfile from "./ProfileServiceScreen/OrganizationProfile";
import ServiceDeptProfile from "./ProfileServiceScreen/ServiceDeptProfile";

const ProfileScreenDetails = ({
  ds1,
  profession,
  profInitials,
  serviceName,
  followers,
  email,
  cellDetails,
  program,
  bio,
  username,
  research,
  Executives,
  departments,
  programs,
  code,
  link,
  faculty,
  offices,
}) => {
  const user = useGlobal((state) => state.user);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: "2%",
        paddingHorizontal: "2%",
      }}
    >
      {/* {ds1 === "Unverified" && <UnverifiedUser networkLink={networkLink} />} */}

      {ds1 === "Student" && (
        <StudentProfile
          profession={profession}
          profInitials={profInitials}
          serviceName={serviceName}
          email={email}
          cellDetails={cellDetails}
          bio={bio}
          program={program}
          username={username}
        />
      )}

      {ds1 === "Staff" && (
        <StaffProfile
          profession={profession}
          profInitials={profInitials}
          serviceName={serviceName}
          email={email}
          cellDetails={cellDetails}
          bio={bio}
          program={program}
          username={username}
        />
      )}

      {ds1 === "Organization" && (
        <OrganizationProfile
          ds1={ds1}
          bio={bio}
          code={code}
          email={email}
          followers={followers}
        />
      )}

      {ds1 === "Bloger" && (
        <ServiceDeptProfile
          ds1={ds1}
          code={code}
          email={email}
          bio={bio}
          followers={followers}
        />
      )}

      {ds1 === "Service" && (
        <ServiceDeptProfile
          ds1={ds1}
          code={code}
          email={email}
          bio={bio}
          followers={followers}
        />
      )}

      {ds1 === "Community" && (
        <ServiceDeptProfile
          ds1={ds1}
          code={code}
          email={email}
          bio={bio}
          followers={followers}
        />
      )}

      {/* {user.username !== username && <Report />} */}
    </ScrollView>
  );
};

export default ProfileScreenDetails;

const styles = StyleSheet.create({});
