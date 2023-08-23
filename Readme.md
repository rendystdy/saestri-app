
# React Native Skeleton

This project is a [React Native](https://facebook.github.io/react-native/) skeleton that can be used to kickstart a mobile application.

The skeleton provides **an optimized architecture for building solid cross-platform mobile applications** through separation of concerns between the UI and business logic.

## Requirements

Node 12 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

You also need to install the dependencies required by React Native.  
Go to the [React Native environment setup](https://reactnative.dev/docs/environment-setup), then select `React Native CLI Quickstart` tab.  
Follow instructions for your given `development OS` and `target OS`.

## Quick start

To get started this project you can follow this steps  :

```
git clone https://gitlab.com/rifqifauzi/saestri.git
```

Assuming you have all the requirements installed, you can run the project by running:

- `yarn install` to install all depedencies
- `cd ios && pod install` to install all depedencies
- `yarn <platform>` to run the *platform* application (remember to start a simulator or connect a device)


## Deployment

To get started with deployment, you can follow the steps below:

- the first step you can increase 1 versioncode & versionName from the current one in the android/app/build.gradle file
- run command `yarn / npm build:bundle:android`
- after build success you can check result in android/app/build/outputs/bundle/release
- go to google play console you can choose tab pengujian > Pengujian Internal
- create new release
- upload file aab to google play console
- add release note
- after that click button Berikutnya follow the steps until finish
- after a successful Internal Test release, you can proceed to Production release. the steps are the same as Internal Testing, the difference is you don't need to upload the aab file again, you can take it from "Add from Collection" after that select the version you want to upload.

## Directory List Src

src

- assets
	- fonts : tempat menyimpan custom fonts
	- images : tempat menyimpan semua images
- components : folder component untuk menyimpan component2 kecil yang reusable bisa dipakai lebih dari 1 Screen / Halaman
  - Button
	- Modal
	- Dsb
- config : folder config berisikan configurasi untuk penggunaan Redux (State Management)
- constant : folder constant berisikan file static seperti file color untuk menampung semua color yang dipakai agar secara pemanggilan dan jika ada perubahan color menjadi lebih mudah
- helper : folder helper berisikan fungsi2 yang bisa di buat reusable di simpan di file ini agar meminimalisir terjadi fungsi yang sama dan menjadi clean code
- interfaces : folder interface berisikan sekumpulan interface / type yang di butuhkan seperti di component / page
- router : config routing dari react-navigation
- screens: folder screens berisikan semua page / screen yang ada
- store : folder store berisikan Action & Reducer yang untuk menghandle state management dari Redux
- validator : not used
