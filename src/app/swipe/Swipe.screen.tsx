import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import tw from 'twrnc';

const Swipes = () => {
  const [choices, setChoices] = React.useState([
    'DO',
    'MORE',
    'OF',
    'WHAT',
    'MAKES',
    'YOU',
    'HAPPY',
  ]);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {/* <Text style={tw`text-indigo-500`}>hello!</Text> */}
      <View style={tw`h-full`}>
        <Swiper
          verticalSwipe={false}
          cards={[12, 3, 4, 5, 6, 7]}
          renderCard={card => {
            return <Card />;
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={0}
          backgroundColor={'#fff'}
          stackSize={10}
        />
      </View>
    </SafeAreaView>
  );
};

const Card = () => (
  <View
    style={{
      ...tw`h-70% bg-white border-2 border-solid overflow-hidden`,
      ...styles.card,
    }}>
    <ScrollView style={tw` flex flex-1 h-full`}>
      <Image
        style={tw`w-full h-auto h-100`}
        source={{
          uri: 'https://i.namu.wiki/i/jJF3CAK27xqwiZqEThUBzzHRzDBoQlMGEuwKXRxdePm9lKkPNcFckJqydCHYeCrRk66NkL3xgrP4iIKI8S5KYA.webp',
        }}
      />
      <View style={tw`p-6`}>
        <Text style={tw`font-medium text-gray-400 mb-1`}>sdfsdf</Text>
        <Text style={tw`font-medium text-gray-900 mb-3`}>sdfsdf</Text>
        <Text style={tw`leading-relaxed mb-3`}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
          similique omnis expedita consectetur. Quo corrupti architecto,
          delectus eveniet aspernatur ratione, expedita, autem aliquid quod
          illum reprehenderit molestias sint inventore cumque explicabo soluta
          quae nisi! Harum, vero quae corrupti nulla, obcaecati iure impedit
          adipisci nostrum molestias, in eligendi numquam? Nostrum sapiente esse
          ab ipsa, excepturi voluptate vitae, asperiores enim labore, dicta
          voluptatem magni inventore earum fugiat quidem commodi accusantium
          eligendi odit tempore necessitatibus alias eos voluptatum quas
          laudantium? Dignissimos rerum voluptas maiores excepturi consequuntur
          doloremque, labore, quibusdam aliquid distinctio numquam accusamus
          molestiae, voluptates modi placeat! Debitis alias obcaecati recusandae
          repellendus hic fugit optio minima rem eius suscipit, mollitia tenetur
          amet non consectetur earum officia impedit quisquam incidunt sint
          expedita! Minus, modi molestias? Cumque quae repudiandae soluta ut,
          eos ullam provident accusamus nulla tempore cupiditate labore saepe
          deserunt iure suscipit iusto, dolorem expedita, ipsum nesciunt
          quisquam dolore enim commodi praesentium eius! Explicabo adipisci
        </Text>
        <View style={tw``}></View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});

export default Swipes;
