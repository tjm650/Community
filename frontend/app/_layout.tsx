import { Slot } from 'expo-router';
import useEffect from react

export default function RootLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);
	return <Slot />;
}
