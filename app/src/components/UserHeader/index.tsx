import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

interface UserHeaderProps {
  userName: string;
  avatarUrl?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  userName,
  avatarUrl = `https://ui-avatars.com/api/?name=${userName
    .split(" ")
    .map((n) => n[0])
    .join("")}&background=6B4EFF&color=fff`,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      </View>
    </View>
  );
};

export default UserHeader;
