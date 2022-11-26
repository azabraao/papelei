import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import createTw from "react-pdf-tailwind";
import papeleiLogo from "assets/logo.png";
import useUser from "lib/useUser";
import { numberToMoney } from "utils";
import axios from "axios";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Helvetica Neue", "sans-serif"],
    },
    extend: {
      colors: {
        success: "#3ab795ff",
      },
    },
  },
});

Font.register({
  family: "Helvetica Neue",
  fonts: [
    {
      src: `fonts/Helvetica/Helvetica-Neue-Light.ttf`,
      fontWeight: "light",
    },
    {
      src: `fonts/Helvetica/Helvetica-Neue-Medium.ttf`,
      fontWeight: "regular",
    },
    {
      src: `fonts/Helvetica/Helvetica-Neue-Bold.ttf`,
      fontWeight: "bold",
    },
  ],
});

const today = new Date().toLocaleDateString("pt-BR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface PDFProps {
  client: Client;
  comments: string;
  cartTotal: number;
  cartProducts: CartProduct[];
}

const PDF = ({ client, comments, cartTotal, cartProducts }: PDFProps) => {
  const { user } = useUser();
  // const [image, setImage] = useState<string>(null);

  const businessImage = user?.business?.[0].picture;

  useEffect(() => {
    if (businessImage) {
      // fetch(businessImage).then((response) => {
      //   console.log("response>>>", response);
      //   response.arrayBuffer().then((image) => {
      //     setImage(image);
      //   });
      //   // response
      //   //   .json()
      //   //   .then((image) =>
      //   //   );
      //   // setImage(Buffer.from(response.body.getReader(), "binary").toString("base64"))
      // });
      // axios
      //   .get(businessImage, {
      //     responseType: "arraybuffer",
      //     headers: {
      //       origin: "*",
      //       maxAgeSeconds: 3600,
      //     },
      //   })
      //   .then((response) =>
      //     setImage(Buffer.from(response.data, "binary").toString("base64"))
      //   );
    }
  }, [businessImage]);

  return (
    <Document>
      <Page
        size="A4"
        style={{
          ...tw("pt-10 pb-20 pr-10 pl-10"),
          color: "#605f63ff",
        }}
      >
        {/* <View style={tw("flex flex-row w-full justify-between items-center")}> */}
        <View>
          {/* <Image
            // src={image || papeleiLogo.src}
            src={image}
            cache={false}
            style={{ width: 96, height: 58.93 }}
            source={{
              uri: businessImage,
              method: "GET",
              body: {},
              headers: {},
            }}

            
          /> */}

          <Image
            // src={businessImage}
            cache={false}
            style={{ width: 96, height: 58.93 }}
            src={{
              uri: businessImage,
              method: "GET",
              headers: {},
              body: "",
            }}
          />
          {/* 
          <Image
            style={{ width: 96, height: 58.93 }}
            // src={newImgage.src}
            src={image}
            cache={false}
          /> */}
          {/* <Text style={tw("text-lg font-bold uppercase")}>
            {user?.business[0]?.name}
          </Text> */}
          <Text style={tw("text-lg font-bold uppercase")}>Orçamento</Text>
        </View>
        <View style={tw("w-full h-8")} />
        <View style={tw("w-full flex flex-row justify-between items-center")}>
          <Text style={{ ...tw("font-bold text-sm mb-2"), lineHeight: 1.6 }}>
            Cliente
          </Text>
          <Text style={{ ...tw("text-sm"), lineHeight: 1.6 }}>{today}</Text>
        </View>
        <View>
          <Text style={{ ...tw("font-bold text-sm"), lineHeight: 1.6 }}>
            {client?.name}
          </Text>
          <Text style={{ ...tw("text-sm"), width: "281px", lineHeight: 1.6 }}>
            {client?.address}
          </Text>
        </View>
        <View style={tw("py-10")}>
          <View
            style={{
              ...tw("py-3 flex flex-row border-t-[0.5px] border-b-[0.5px]"),
              borderColor: "grey",
            }}
          >
            <Text style={tw("text-sm font-bold w-[243px]")}>Descrição</Text>
            <Text style={tw("text-sm font-bold w-[96px]")}>Valor</Text>
            <Text style={tw("text-sm font-bold w-[93px]")}>Qtd</Text>
            <Text style={tw("text-sm font-bold")}>Total</Text>
          </View>

          {cartProducts.map((product, key) => (
            <View
              key={key + Math.random()}
              style={{
                ...tw("py-2 flex flex-row border-b-[0.5px]"),
                borderColor: "grey",
              }}
            >
              <Text style={tw("text-sm w-[243px]")}>{product.name}</Text>
              <Text style={tw("text-sm w-[96px]")}>
                {numberToMoney(product.price)}
              </Text>
              <Text style={tw("text-sm w-[93px]")}>{product.quantity}</Text>
              <Text style={tw("text-sm")}>
                {numberToMoney(product.price * product.quantity)}
              </Text>
            </View>
          ))}
        </View>
        <View style={tw("pb-10 flex flex-row justify-end")}>
          {/* <View style={tw("flex flex-col")}>
            <Image src={pixAMD.src} style={{ width: 97, height: 97 }} />
            <Text style={{ ...tw("text-sm"), lineHeight: 1.6 }}>
              Pix: {AMD.PIX}
            </Text>
          </View> */}
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("text-base font-bold")}>Formas de pagamento</Text>
            <View
              style={tw("flex flex-row justify-between items-center w-[172px]")}
            >
              <Text style={tw("text-xs")}>Em até 12x no cartão</Text>
              <Text style={tw("text-sm")}>{numberToMoney(cartTotal)}</Text>
            </View>
            <View
              style={tw("flex flex-row justify-between items-center w-[172px]")}
            >
              <View style={tw("flex flex-row")}>
                <Text style={tw("text-xs")}>À vista no pix </Text>
                <Text style={tw("text-xs text-success")}>(-10%)</Text>
              </View>
              <Text style={tw("text-sm")}>
                {numberToMoney(cartTotal * 0.9)}
              </Text>
            </View>
          </View>
        </View>
        {/* 
        <View>
          <Text style={tw("text-base font-bold")}>
            {comments && "Observações"}
          </Text>
          <Text style={{ ...tw("text-sm") }}>{comments}</Text>
          
        </View> */}

        <View>
          {comments ? (
            <>
              <Text style={tw("text-base font-bold")}>Observações</Text>
              <Text style={tw("text-sm")}>{comments}</Text>
            </>
          ) : (
            // TODO: improve this. This is a workaround for avoiding a huge blank space in the page.
            <Text
              style={{
                color: "transparent",
              }}
            >
              a
            </Text>
          )}
        </View>

        <View style={tw("py-10")}>
          <Text style={tw("text-sm")}>{user?.name}</Text>
          <Text style={{ ...tw("text-xs font-bold"), fontWeight: "bold" }}>
            Responsável
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default memo(
  dynamic(() => Promise.resolve(PDF), {
    ssr: false,
  })
);

/* TODO: ALLOW USER TO GIVE THE BELOW INFORMATION ABOUT THE COMPANY */

/* <View
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
        >
          <Text>
            {AMD.COMPANY_NAME} | {AMD.CNPJ}
          </Text>
          <Text>
            Tel.: {AMD.TEL} | E-mail: {AMD.EMAIL}
          </Text>
        </View> */
