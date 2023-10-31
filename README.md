# placar-sinuca
Trabalho programação para dispositivos móveis
## Sobre
O aplicativo foi feito em React Native, com auxílio da plataforma Expo
## Como rodar
Navegue até o diretório do projeto e execute:
```
npm install
npx expo start
```
Neste momento, a CLI do Expo irá providenciar algumas opções (Android, IOS, Emulador etc.). A que recomendamos é escanear o QR Code providenciado na linha de comando através do aplicativo Expo Go ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US), [IOS](https://apps.apple.com/br/app/expo-go/id982107779)). Neste método, é necessário que computador e celular estejam na mesma rede Wi-Fi.

Também é possível rodar via USB, caso o celular esteja conectado no computador e esteja com modo de desenvolvedor ativo, sendo necessário apertar a letra A para Android ou I para IOS no CLI do Expo. 

Para rodar via emulador, é necessário ter instalado o Android Studio (junto com Android SDK e Android Virtual Device), fazer o setup do emulador e apertar a letra A para Android ou I para IOS no CLI do Expo. 
## Como gerar .apk
Necessário uma conta Expo.
```
npm install -g eas-cli
eas build -p android --profile preview
```
