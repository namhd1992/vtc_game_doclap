import React, { Component } from 'react';
import {
    View, Text, FlatList, Image, TouchableOpacity,  Dimensions, RefreshControl, TextInput
} from 'react-native';

const { width } = Dimensions.get('window');
const data=[{"img": "https://wallpapercave.com/wpt/wp6333525.jpg", "link": "https://wallpapercave.com/anime-aesthetic-mobile-wallpapers", "name": "Anime Aesthetic", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp6392122.jpg", "link": "https://wallpapercave.com/fortnite-season-10-mobile-wallpapers", "name": "Fortnite Season 10", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp6886985.jpg", "link": "https://wallpapercave.com/fortnite-mobile-uhd-wallpapers", "name": "Fortnite UHD", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp4770240.jpg", "link": "https://wallpapercave.com/fortnite-on-mobile-wallpapers", "name": "Fortnite On", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853308.jpeg", "link": "https://wallpapercave.com/iphone-13-4k-wallpapers", "name": "iPhone 13 4k", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853373.jpeg", "link": "https://wallpapercave.com/iphone-13-pro-max-wallpapers", "name": "iPhone 13 Pro Max", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853331.jpeg", "link": "https://wallpapercave.com/iphone-13-hd-wallpapers", "name": "iPhone 13 HD", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853413.jpeg", "link": "https://wallpapercave.com/iphone-13-pro-wallpapers", "name": "iPhone 13 Pro", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853424.jpeg", "link": "https://wallpapercave.com/hd-iphone-13-wallpapers", "name": "HD iPhone 13", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9853467.png", "link": "https://wallpapercave.com/4k-iphone-13-wallpapers", "name": "4k iPhone 13", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9864800.jpeg", "link": "https://wallpapercave.com/iphone-13-uhd-wallpapers", "name": "iPhone 13 UHD", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9870584.jpeg", "link": "https://wallpapercave.com/iphone-13-stock-wallpapers", "name": "iPhone 13 Stock", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9900292.png", "link": "https://wallpapercave.com/iphone-13-original-wallpapers", "name": "iPhone 13 Original", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9910875.png", "link": "https://wallpapercave.com/iphone-13-pro-4k-wallpapers", "name": "iPhone 13 Pro 4k", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp6229388.jpg", "link": "https://wallpapercave.com/iphone-13-night-sky-wallpapers", "name": "iPhone 13 Night Sky", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9951975.jpg", "link": "https://wallpapercave.com/iphone-13-black-minimal-wallpapers", "name": "iPhone 13 Black Minimal", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9958060.png", "link": "https://wallpapercave.com/iphone-13-mods-wallpapers", "name": "iPhone 13 Mods", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9973064.jpg", "link": "https://wallpapercave.com/iphone-13-stock-4k-wallpapers", "name": "iPhone 13 Stock 4k", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp9977540.jpg", "link": "https://wallpapercave.com/iphone-13-pro-max-4k-hd-dark-mode-wallpapers", "name": "iPhone 13 Pro Max 4k HD Dark Mode", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp8505334.jpg", "link": "https://wallpapercave.com/iphone-13-border-wallpapers", "name": "iPhone 13 Border", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp10023224.jpg", "link": "https://wallpapercave.com/iphone-13-mini-wallpapers", "name": "iPhone 13 Mini", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp10225294.jpg", "link": "https://wallpapercave.com/iphone-13-awesome-dark-wallpapers", "name": "iPhone 13 Awesome Dark", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp10286273.jpg", "link": "https://wallpapercave.com/iphone-13-pink-wallpapers", "name": "iPhone 13 Pink", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp8038697.jpg", "link": "https://wallpapercave.com/iphone-13-pro-max-christmas-wallpapers", "name": "iPhone 13 Pro Max Christmas", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp7881549.jpg", "link": "https://wallpapercave.com/iphone-13-christmas-wallpapers", "name": "iPhone 13 Christmas", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp10362189.jpg", "link": "https://wallpapercave.com/disney-iphone-13-wallpapers", "name": "Disney iPhone 13", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp7403272.jpg", "link": "https://wallpapercave.com/13-reasons-why-iphone-wallpapers", "name": "13 Reasons Why iPhone", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp5780718.jpg", "link": "https://wallpapercave.com/jason-friday-the-13th-iphone-wallpapers", "name": "Jason Friday The 13th iPhone", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp6355956.jpg", "link": "https://wallpapercave.com/bmw-135i-iphone-wallpapers", "name": "BMW 135i iPhone", "tag":'iphone'},
    {"img": "https://wallpapercave.com/wpt/wp8070440.jpg", "link": "https://wallpapercave.com/winter-animals-mobile-wallpapers", "name": "Winter Animals", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7995952.png", "link": "https://wallpapercave.com/cute-anime-mobile-wallpapers", "name": "Cute Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4961308.jpg", "link": "https://wallpapercave.com/indian-beautiful-girl-hd-mobile-wallpapers", "name": "Indian Beautiful Girl HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp7740063.jpg", "link": "https://wallpapercave.com/mobile-anime-girls-wallpapers", "name": "Anime Girls", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp6395911.jpg", "link": "https://wallpapercave.com/mobile-girl-beautiful-wallpapers", "name": "Girl Beautiful", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5206135.jpg", "link": "https://wallpapercave.com/mobile-girl-nature-wallpapers", "name": "Girl Nature", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp7760164.jpg", "link": "https://wallpapercave.com/hollywood-hd-girl-mobile-wallpapers", "name": "Hollywood HD Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4811232.jpg", "link": "https://wallpapercave.com/girls-mobile-legends-wallpapers", "name": "Girls Legends", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp8530159.jpg", "link": "https://wallpapercave.com/powerpuff-girls-z-mobile-wallpapers", "name": "Powerpuff Girls Z", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp8695627.jpg", "link": "https://wallpapercave.com/mobile-4k-girl-wallpapers", "name": "4k Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp9342119.jpg", "link": "https://wallpapercave.com/4k-mobile-gaming-girl-wallpapers", "name": "4k Gaming Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp7337451.jpg", "link": "https://wallpapercave.com/girl-cartoon-mobile-wallpapers", "name": "Girl Cartoon", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp9623343.jpg", "link": "https://wallpapercave.com/4k-anime-girl-mobile-wallpapers", "name": "4k Anime Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp7335402.jpg", "link": "https://wallpapercave.com/4k-mobile-girl-wallpapers", "name": "4k Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp9581296.jpg", "link": "https://wallpapercave.com/anime-girl-mobile-4k-wallpapers", "name": "Anime Girl 4k", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5153360.jpg", "link": "https://wallpapercave.com/japanese-beautiful-girl-sad-mobile-wallpapers", "name": "Japanese Beautiful Girl Sad", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4987236.jpg", "link": "https://wallpapercave.com/anime-girl-4k-mobile-wallpapers", "name": "Anime Girl 4k", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4952264.jpg", "link": "https://wallpapercave.com/hollywood-mobile-girl-wallpapers", "name": "Hollywood Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5163732.jpg", "link": "https://wallpapercave.com/pubg-mobile-girl-hd-wallpapers", "name": "PUBG Girl Hd", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5331843.jpg", "link": "https://wallpapercave.com/abhilasha-beautiful-indian-girl-hd-mobile-wallpapers", "name": "Abhilasha Beautiful Indian Girl Hd", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4802557.jpg", "link": "https://wallpapercave.com/modern-style-girl-mobile-wallpapers", "name": "Modern Style Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5220670.jpg", "link": "https://wallpapercave.com/girlfriend-love-mobile-wallpapers", "name": "Girlfriend Love", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4967975.jpg", "link": "https://wallpapercave.com/4k-girl-mobile-wallpapers", "name": "4k Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5622804.jpg", "link": "https://wallpapercave.com/alone-girl-mobile-hd-wallpapers", "name": "Alone Girl HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4928096.jpg", "link": "https://wallpapercave.com/anime-girl-hd-mobile-wallpapers", "name": "Anime Girl HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5240554.jpg", "link": "https://wallpapercave.com/pretty-girl-ultra-hd-mobile-wallpapers", "name": "Pretty Girl Ultra HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5555254.jpg", "link": "https://wallpapercave.com/beautiful-girl-hd-mobile-4k-wallpapers", "name": "Beautiful Girl HD 4k", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5622262.jpg", "link": "https://wallpapercave.com/anime-girl-mobile-wallpapers", "name": "Anime Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5073819.jpg", "link": "https://wallpapercave.com/cosmic-girls-hd-mobile-wallpapers", "name": "Cosmic Girls HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp6080455.jpg", "link": "https://wallpapercave.com/girls-character-4k-mobile-wallpapers", "name": "Girls Character 4k", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5135857.jpg", "link": "https://wallpapercave.com/camera-girl-mobile-wallpapers", "name": "Camera Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp6080455.jpg", "link": "https://wallpapercave.com/anime-mobile-girls-wallpapers", "name": "Anime Girls", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4430228.jpg", "link": "https://wallpapercave.com/smoking-girl-hd-mobile-wallpapers", "name": "Smoking Girl HD", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp4556970.jpg", "link": "https://wallpapercave.com/beautiful-cute-girl-mobile-4k-wallpapers", "name": "Beautiful Cute Girl 4k", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5957707.jpg", "link": "https://wallpapercave.com/muslim-girl-mobile-wallpapers", "name": "Muslim Girl", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5566908.jpg", "link": "https://wallpapercave.com/desi-girls-mobile-wallpapers", "name": "Desi Girls", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp5206135.jpg", "link": "https://wallpapercave.com/cute-mobile-girls-wallpapers", "name": "Cute Girls", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp6810816.jpg", "link": "https://wallpapercave.com/call-of-duty-mobile-girls-wallpapers", "name": "Call Of Duty Girls", "tag":'girl'},
    {"img": "https://wallpapercave.com/wpt/wp7701079.jpg", "link": "https://wallpapercave.com/mobile-grey-anime-wallpapers", "name": "Grey Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7740063.jpg", "link": "https://wallpapercave.com/mobile-anime-girls-wallpapers", "name": "Anime Girls", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7082741.jpg", "link": "https://wallpapercave.com/anime-mobile-4k-wallpapers", "name": "Anime 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5230891.jpg", "link": "https://wallpapercave.com/4k-hd-anime-mobile-wallpapers", "name": "4k HD Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7752030.jpg", "link": "https://wallpapercave.com/anime-4k-mobile-dark-wallpapers", "name": "Anime 4k Dark", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp8157782.jpg", "link": "https://wallpapercave.com/mobile-animal-wallpapers", "name": "Animal", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7590741.jpg", "link": "https://wallpapercave.com/anime-fhd-mobile-wallpapers", "name": "Anime FHD", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp8278653.jpg", "link": "https://wallpapercave.com/anime-for-mobile-wallpapers", "name": "Anime For", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5230891.jpg", "link": "https://wallpapercave.com/hd-4k-anime-mobile-wallpapers", "name": "HD 4k Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7575181.jpg", "link": "https://wallpapercave.com/lofi-anime-mobile-wallpapers", "name": "Lofi Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp8611098.jpg", "link": "https://wallpapercave.com/rain-anime-mobile-wallpapers", "name": "Rain Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp6357590.jpg", "link": "https://wallpapercave.com/4k-mobile-anime-wallpapers", "name": "4k Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp8762547.jpg", "link": "https://wallpapercave.com/mortal-kombat-anime-hd-mobile-wallpapers", "name": "Mortal Kombat Anime HD", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7751798.jpg", "link": "https://wallpapercave.com/anime-sky-mobile-4k-wallpapers", "name": "Anime Sky 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp8499218.jpg", "link": "https://wallpapercave.com/cool-anime-hood-mobile-wallpapers", "name": "Cool Anime Hood", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp6420755.jpg", "link": "https://wallpapercave.com/4k-anime-mobile-wallpapers", "name": "4k Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp9612774.png", "link": "https://wallpapercave.com/anime-mobile-hack-wallpapers", "name": "Anime Hack", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp9623343.jpg", "link": "https://wallpapercave.com/4k-anime-girl-mobile-wallpapers", "name": "4k Anime Girl", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp9184940.jpg", "link": "https://wallpapercave.com/mobile-cute-animals-wallpapers", "name": "Cute Animals", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7590741.jpg", "link": "https://wallpapercave.com/anime-hd-mobile-wallpapers", "name": "Anime HD", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp9581296.jpg", "link": "https://wallpapercave.com/anime-girl-mobile-4k-wallpapers", "name": "Anime Girl 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp7518947.jpg", "link": "https://wallpapercave.com/halloween-anime-mobile-wallpapers", "name": "Halloween Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp10144154.jpg", "link": "https://wallpapercave.com/autumn-anime-mobile-wallpapers", "name": "Autumn Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5780441.jpg", "link": "https://wallpapercave.com/badass-anime-mobile-wallpapers", "name": "Badass Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp6433349.png", "link": "https://wallpapercave.com/anime-mobile-wallpapers", "name": "Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5153027.jpg", "link": "https://wallpapercave.com/puma-animal-mobile-wallpapers", "name": "Puma Animal", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4046886.jpg", "link": "https://wallpapercave.com/black-panther-animal-mobile-wallpapers", "name": "Black Panther Animal", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4987180.jpg", "link": "https://wallpapercave.com/3d-anime-mobile-wallpapers", "name": "3d Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5174485.jpg", "link": "https://wallpapercave.com/wolverine-anime-mobile-wallpapers", "name": "Wolverine Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4384864.jpg", "link": "https://wallpapercave.com/hanabi-anime-mobile-legend-wallpapers", "name": "Hanabi Anime Legend", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5188201.jpg", "link": "https://wallpapercave.com/anime-love-couple-mobile-hd-wallpapers", "name": "Anime Love Couple Hd", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4987236.jpg", "link": "https://wallpapercave.com/anime-girl-4k-mobile-wallpapers", "name": "Anime Girl 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5245904.jpg", "link": "https://wallpapercave.com/vijay-mass-mobile-animated-wallpapers", "name": "Vijay Mass Animated", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5266789.jpg", "link": "https://wallpapercave.com/lord-shiva-animated-hd-mobile-wallpapers", "name": "Lord Shiva Animated Hd", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5107558.jpg", "link": "https://wallpapercave.com/cherry-blossom-anime-mobile-wallpapers", "name": "Cherry Blossom Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5230891.jpg", "link": "https://wallpapercave.com/anime-4k-mobile-wallpapers", "name": "Anime 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5345904.jpg", "link": "https://wallpapercave.com/hd-love-animation-mobile-wallpapers", "name": "Hd Love Animation", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5536613.jpg", "link": "https://wallpapercave.com/animal-black-wolfs-hd-mobile-wallpapers", "name": "Animal Black Wolfs HD", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4469378.jpg", "link": "https://wallpapercave.com/mobile-love-4k-anime-wallpapers", "name": "Love 4k Anime", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5563523.jpg", "link": "https://wallpapercave.com/4k-anime-boy-mobile-wallpapers", "name": "4k Anime Boy", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5262219.jpg", "link": "https://wallpapercave.com/badass-dark-anime-4k-mobile-wallpapers", "name": "Badass Dark Anime 4k", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp3483217.png", "link": "https://wallpapercave.com/anime-logo-mobile-wallpapers", "name": "Anime Logo", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5588158.jpg", "link": "https://wallpapercave.com/different-animal-mobile-wallpapers", "name": "Different Animal", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp5634310.jpg", "link": "https://wallpapercave.com/animation-mobile-wallpapers", "name": "Animation", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp4928096.jpg", "link": "https://wallpapercave.com/anime-girl-hd-mobile-wallpapers", "name": "Anime Girl HD", "tag":'anime'},
    {"img": "https://wallpapercave.com/wpt/wp6590623.jpg", "link": "https://wallpapercave.com/minimal-space-mobile-wallpapers", "name": "Minimal Space", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp7786646.jpg", "link": "https://wallpapercave.com/4k-space-for-mobile-wallpapers", "name": "4k Space For", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5304682.jpg", "link": "https://wallpapercave.com/hd-space-mobile-wallpapers", "name": "Hd Space", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5345121.jpg", "link": "https://wallpapercave.com/space-mobile-wallpapers", "name": "Space", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5247411.jpg", "link": "https://wallpapercave.com/4k-mobile-space-wallpapers", "name": "4k Space", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp6074910.jpg", "link": "https://wallpapercave.com/the-space-between-us-mobile-wallpapers", "name": "The Space Between Us", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp6449707.jpg", "link": "https://wallpapercave.com/space-x-mobile-wallpapers", "name": "Space X", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp4830323.jpg", "link": "https://wallpapercave.com/space-mobile-hd-wallpapers", "name": "Space HD", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5480993.png", "link": "https://wallpapercave.com/space-for-mobile-wallpapers", "name": "Space For", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5938135.jpg", "link": "https://wallpapercave.com/picture-mobile-space-wallpapers", "name": "Picture Space", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp4990426.jpg", "link": "https://wallpapercave.com/deep-space-9-mobile-wallpapers", "name": "Deep Space 9", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp5094332.png", "link": "https://wallpapercave.com/mobile-space-1440p-wallpapers", "name": "Space 1440p", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp4927949.jpg", "link": "https://wallpapercave.com/space-star-mobile-wallpapers", "name": "Space Star", "tag":'space'},
    {"img": "https://wallpapercave.com/wpt/wp8594627.jpg", "link": "https://wallpapercave.com/4k-gaming-for-mobile-wallpapers", "name": "4k Gaming For", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp9163873.jpg", "link": "https://wallpapercave.com/4k-gaming-neon-mobile-wallpapers", "name": "4k Gaming Neon", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp9342119.jpg", "link": "https://wallpapercave.com/4k-mobile-gaming-girl-wallpapers", "name": "4k Gaming Girl", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp10247437.jpg", "link": "https://wallpapercave.com/squid-game-mobile-wallpapers", "name": "Squid Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6926725.jpg", "link": "https://wallpapercave.com/pubg-game-mobile-wallpapers", "name": "PUBG Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5195083.jpg", "link": "https://wallpapercave.com/best-games-mobile-wallpapers", "name": "Best Games", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5392510.jpg", "link": "https://wallpapercave.com/playstation-games-mobile-wallpapers", "name": "PlayStation Games", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5481347.jpg", "link": "https://wallpapercave.com/games-nokia-mobile-wallpapers", "name": "Games Nokia", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5490379.jpg", "link": "https://wallpapercave.com/batman-game-hd-mobile-wallpapers", "name": "Batman Game HD", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp3144213.jpg", "link": "https://wallpapercave.com/free-fire-game-mobile-wallpapers", "name": "Free Fire Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5593644.jpg", "link": "https://wallpapercave.com/vaporwave-mobile-game-wallpapers", "name": "Vaporwave Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5594221.jpg", "link": "https://wallpapercave.com/total-overdose-mobile-game-wallpapers", "name": "Total Overdose Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5955535.jpg", "link": "https://wallpapercave.com/game-assassins-creed-3-mobile-game-android-gameplay-hd-wallpapers", "name": "Game Assassin's Creed 3 Game Android Gameplay HD", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6121498.jpg", "link": "https://wallpapercave.com/gaming-hd-for-mobile-wallpapers", "name": "Gaming HD For", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5419592.jpg", "link": "https://wallpapercave.com/god-of-war-game-android-mobile-wallpapers", "name": "God Of War Game Android", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5319353.png", "link": "https://wallpapercave.com/the-goose-game-mobile-wallpapers", "name": "The Goose Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5392506.jpg", "link": "https://wallpapercave.com/hd-games-for-mobile-wallpapers", "name": "HD Games For", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6417192.jpg", "link": "https://wallpapercave.com/y5-mobile-gaming-wallpapers", "name": "Y5 Gaming", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6438581.jpg", "link": "https://wallpapercave.com/game-of-thrones-4k-mobile-wallpapers", "name": "Game Of Thrones 4k", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6148893.jpg", "link": "https://wallpapercave.com/games-mobile-hd-wallpapers", "name": "Games HD", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5418013.jpg", "link": "https://wallpapercave.com/game-of-thrones-quotes-hd-mobile-wallpapers", "name": "Game Of Thrones Quotes HD", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp6983846.jpg", "link": "https://wallpapercave.com/tekken-mobile-game-wallpapers", "name": "Tekken Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp7009660.jpg", "link": "https://wallpapercave.com/mobile-hd-game-wallpapers", "name": "HD Game", "tag":'game'},
    {"img": "https://wallpapercave.com/wpt/wp5758905.jpg", "link": "https://wallpapercave.com/mobile-4k-movies-wallpapers", "name": "4k Movies", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp9444569.jpg", "link": "https://wallpapercave.com/harry-potter-movie-mobile-wallpapers", "name": "Harry Potter Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5840400.jpg", "link": "https://wallpapercave.com/mobile-movie-wallpapers", "name": "Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5041474.jpg", "link": "https://wallpapercave.com/joker-movie-posters-4k-mobile-wallpapers", "name": "Joker Movie Posters 4k", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5419988.jpg", "link": "https://wallpapercave.com/shruti-hassan-hd-mobile-puli-movie-wallpapers", "name": "Shruti Hassan HD Puli Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp4874989.jpg", "link": "https://wallpapercave.com/hrithik-roshan-hd-mobile-war-movie-wallpapers", "name": "Hrithik Roshan HD War Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5456249.jpg", "link": "https://wallpapercave.com/hd-mobile-movies-wallpapers", "name": "HD Movies", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5474498.jpg", "link": "https://wallpapercave.com/hollywood-movies-mobile-hd-wallpapers", "name": "Hollywood Movies HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5245708.png", "link": "https://wallpapercave.com/birds-of-prey-movie-hd-mobile-wallpapers", "name": "Birds Of Prey Movie HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5557391.jpg", "link": "https://wallpapercave.com/joker-2019-movie-mobile-wallpapers", "name": "Joker 2019 Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp4705941.png", "link": "https://wallpapercave.com/birds-of-prey-movie-mobile-wallpapers", "name": "Birds Of Prey Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5341213.jpg", "link": "https://wallpapercave.com/joker-movie-hd-4k-mobile-wallpapers", "name": "Joker Movie HD 4k", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5699508.jpg", "link": "https://wallpapercave.com/avengers-movie-nokia-mobile-wallpapers", "name": "Avengers Movie Nokia", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5714097.jpg", "link": "https://wallpapercave.com/movie-hd-android-mobile-wallpapers", "name": "Movie HD Android", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5456148.jpg", "link": "https://wallpapercave.com/action-movies-mobile-wallpapers", "name": "Action Movies", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp4944761.jpg", "link": "https://wallpapercave.com/mobile-movies-wallpapers", "name": "Movies", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5825351.jpg", "link": "https://wallpapercave.com/kung-fu-panda-movie-hd-mobile-android-wallpapers", "name": "Kung Fu Panda Movie HD Android", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp2079019.jpg", "link": "https://wallpapercave.com/the-planet-of-the-apes-movie-hd-mobile-wallpapers", "name": "The Planet Of The Apes Movie HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp4404460.jpg", "link": "https://wallpapercave.com/scooby-doo-movie-mobile-wallpapers", "name": "Scooby Doo Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5714103.jpg", "link": "https://wallpapercave.com/john-cena-movies-mobile-hd-wallpapers", "name": "John Cena Movies HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5380290.jpg", "link": "https://wallpapercave.com/twilight-movie-mobile-wallpapers", "name": "Twilight Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6174781.jpg", "link": "https://wallpapercave.com/charlie-movie-ultra-hd-mobile-wallpapers", "name": "Charlie Movie Ultra HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6245514.jpg", "link": "https://wallpapercave.com/arctic-dogs-movie-mobile-wallpapers", "name": "Arctic Dogs Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5113966.jpg", "link": "https://wallpapercave.com/world-famous-movie-mobile-wallpapers", "name": "World Famous Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp4992459.jpg", "link": "https://wallpapercave.com/deadpool-movie-hd-mobile-wallpapers", "name": "Deadpool Movie HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5129895.png", "link": "https://wallpapercave.com/deadpool-2-movie-hd-mobile-wallpapers", "name": "Deadpool 2 Movie HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6650182.jpg", "link": "https://wallpapercave.com/wolverine-movie-hd-mobile-wallpapers", "name": "Wolverine Movie HD", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6736513.jpg", "link": "https://wallpapercave.com/john-wick-movie-mobile-wallpapers", "name": "John Wick Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6760551.jpg", "link": "https://wallpapercave.com/the-master-movie-mobile-wallpapers", "name": "The Master Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp6896152.jpg", "link": "https://wallpapercave.com/pirate-of-the-caribbean-movie-mobile-wallpapers", "name": "Pirate Of The Caribbean Movie", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp5115598.jpg", "link": "https://wallpapercave.com/mobile-games-and-movies-wallpapers", "name": "Games And Movies", "tag":'movie'},
    {"img": "https://wallpapercave.com/wpt/wp7712351.jpg", "link": "https://wallpapercave.com/fresh-natural-4k-mobiles-wallpapers", "name": "Fresh Natural 4k", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5206135.jpg", "link": "https://wallpapercave.com/mobile-girl-nature-wallpapers", "name": "Girl Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp7879171.jpg", "link": "https://wallpapercave.com/beautiful-mobile-nature-wallpapers", "name": "Beautiful Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp7909206.jpg", "link": "https://wallpapercave.com/4k-nature-mobile-wallpapers", "name": "4k Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp8610401.jpg", "link": "https://wallpapercave.com/8k-nature-mobile-wallpapers", "name": "8k Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4825550.jpg", "link": "https://wallpapercave.com/4k-nature-for-mobile-wallpapers", "name": "4k Nature For", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp9012559.jpg", "link": "https://wallpapercave.com/green-nature-mobile-4k-wallpapers", "name": "Green Nature 4k", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp9572389.jpg", "link": "https://wallpapercave.com/colorful-nature-hd-mobile-wallpapers", "name": "Colorful Nature HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp9619596.jpg", "link": "https://wallpapercave.com/4k-3d-nature-mobile-wallpapers", "name": "4k 3D Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5191715.jpg", "link": "https://wallpapercave.com/hd-mobile-nature-wallpapers", "name": "Hd Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4814704.jpg", "link": "https://wallpapercave.com/nature-hd-mobile-wallpapers", "name": "Nature Hd", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3209025.jpg", "link": "https://wallpapercave.com/nature-mobile-wallpapers", "name": "Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3209025.jpg", "link": "https://wallpapercave.com/mobile-natural-wallpapers", "name": "Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4809705.jpg", "link": "https://wallpapercave.com/nature-mobile-hd-wallpapers", "name": "Nature HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6565540.jpg", "link": "https://wallpapercave.com/full-hd-mobile-natural-wallpapers", "name": "Full HD Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5154414.jpg", "link": "https://wallpapercave.com/green-ground-nature-mobile-wallpapers", "name": "Green Ground Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5177432.jpg", "link": "https://wallpapercave.com/nature-3d-mobile-hd-1920-wallpapers", "name": "Nature 3d Hd 1920", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5183307.jpg", "link": "https://wallpapercave.com/nature-keypad-mobile-wallpapers", "name": "Nature Keypad", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4805726.jpg", "link": "https://wallpapercave.com/natural-hd-mobile-wallpapers", "name": "Natural Hd", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5250971.jpg", "link": "https://wallpapercave.com/mobile-full-hd-nature-wallpapers", "name": "Full Hd Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4715697.jpg", "link": "https://wallpapercave.com/red-nature-mobile-wallpapers", "name": "Red Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4795634.jpg", "link": "https://wallpapercave.com/3d-natural-mobile-wallpapers", "name": "3d Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4881041.jpg", "link": "https://wallpapercave.com/cool-hd-mobile-nature-wallpapers", "name": "Cool HD Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3209025.jpg", "link": "https://wallpapercave.com/nature-related-mobile-wallpapers", "name": "Nature Related", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4805783.jpg", "link": "https://wallpapercave.com/blue-nature-mobile-wallpapers", "name": "Blue Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5032230.jpg", "link": "https://wallpapercave.com/beautiful-natural-mobile-wallpapers", "name": "Beautiful Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5714178.jpg", "link": "https://wallpapercave.com/hd-romantic-natural-mobile-wallpapers", "name": "HD Romantic Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5495656.jpg", "link": "https://wallpapercave.com/mobile-in-nature-wallpapers", "name": "In Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5300768.jpg", "link": "https://wallpapercave.com/nature-hd-3d-full-screen-mobile-wallpapers", "name": "Nature HD 3D Full Screen", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6173402.jpg", "link": "https://wallpapercave.com/blur-nature-hd-mobile-wallpapers", "name": "Blur Nature HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6182039.jpg", "link": "https://wallpapercave.com/nature-spring-mobile-wallpapers", "name": "Nature Spring", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4809705.jpg", "link": "https://wallpapercave.com/mobile-on-nature-wallpapers", "name": "On Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3692990.jpg", "link": "https://wallpapercave.com/nature-hd-mobiles-wallpapers", "name": "Nature HDs", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4805726.jpg", "link": "https://wallpapercave.com/hd-nature-photo-mobile-wallpapers", "name": "HD Nature Photo", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6556685.jpg", "link": "https://wallpapercave.com/hd-of-nature-mobile-wallpapers", "name": "HD Of Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3209025.jpg", "link": "https://wallpapercave.com/best-nature-mobile-wallpapers", "name": "Best Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6720619.jpg", "link": "https://wallpapercave.com/nature-mobile-phone-wallpapers", "name": "Nature Phone", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5300768.jpg", "link": "https://wallpapercave.com/hd-nature-full-screen-mobile-wallpapers", "name": "HD Nature Full Screen", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6835604.jpg", "link": "https://wallpapercave.com/nature-4k-hd-mobile-wallpapers", "name": "Nature 4k HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6502681.jpg", "link": "https://wallpapercave.com/mobile-nature-3d-hd-wallpapers", "name": "Nature 3D HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6835969.jpg", "link": "https://wallpapercave.com/best-4k-mobile-nature-wallpapers", "name": "Best 4k Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5718362.jpg", "link": "https://wallpapercave.com/mobile-android-hd-natural-wallpapers", "name": "Android HD Natural", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp5743662.jpg", "link": "https://wallpapercave.com/anime-nature-4k-mobile-wallpapers", "name": "Anime Nature 4k", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4707837.jpg", "link": "https://wallpapercave.com/nature-beach-hd-android-mobile-wallpapers", "name": "Nature Beach HD Android", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp3692990.jpg", "link": "https://wallpapercave.com/nature-mobile-full-hd-wallpapers", "name": "Nature Full HD", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp8021851.jpg", "link": "https://wallpapercave.com/mobile-nature-winter-wallpapers", "name": "Nature Winter", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4280091.jpg", "link": "https://wallpapercave.com/hd-nature-mobile-wallpapers", "name": "Hd Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp4805734.jpg", "link": "https://wallpapercave.com/mobile-hd-nature-wallpapers", "name": "HD Nature", "tag":'natural'},
    {"img": "https://wallpapercave.com/wpt/wp6593372.jpg", "link": "https://wallpapercave.com/hd-cartoon-mobile-wallpapers", "name": "HD Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp7770142.jpg", "link": "https://wallpapercave.com/cartoon-4k-mobile-wallpapers", "name": "Cartoon 4k", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp3902228.jpg", "link": "https://wallpapercave.com/cartoon-cat-mobile-wallpapers", "name": "Cartoon Cat", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp7919218.jpg", "link": "https://wallpapercave.com/john-cena-cartoon-hd-mobile-wallpapers", "name": "John Cena Cartoon HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4320741.jpg", "link": "https://wallpapercave.com/mobile-legends-cartoon-wallpapers", "name": "Mobile Legends Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5420319.jpg", "link": "https://wallpapercave.com/4k-mobile-cartoon-wallpapers", "name": "4k Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp7337451.jpg", "link": "https://wallpapercave.com/girl-cartoon-mobile-wallpapers", "name": "Girl Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp7366477.jpg", "link": "https://wallpapercave.com/mobile-legends-zodiac-cartoon-wallpapers", "name": "Mobile Legends Zodiac Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5160816.jpg", "link": "https://wallpapercave.com/hd-cartoon-love-mobile-wallpapers", "name": "Hd Cartoon Love", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4849843.jpg", "link": "https://wallpapercave.com/cartoon-cute-mobile-wallpapers", "name": "Cartoon Cute", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5172092.jpg", "link": "https://wallpapercave.com/mia-khalifa-mobile-cartoon-wallpapers", "name": "Mia Khalifa Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5191101.jpg", "link": "https://wallpapercave.com/joker-cartoon-mobile-wallpapers", "name": "Joker Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5192020.jpg", "link": "https://wallpapercave.com/superman-cartoon-mobile-wallpapers", "name": "Superman Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5212167.jpg", "link": "https://wallpapercave.com/cartoon-girl-mobile-hd-wallpapers", "name": "Cartoon Girl Hd", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5200795.jpg", "link": "https://wallpapercave.com/cute-cartoon-hd-mobile-wallpapers", "name": "Cute Cartoon Hd", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5160816.jpg", "link": "https://wallpapercave.com/cartoon-mobile-love-wallpapers", "name": "Cartoon Love", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5420319.jpg", "link": "https://wallpapercave.com/4k-cartoon-mobile-wallpapers", "name": "4k Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5493520.png", "link": "https://wallpapercave.com/cartoons-for-mobile-wallpapers", "name": "Cartoons For", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5497216.jpg", "link": "https://wallpapercave.com/cartoon-face-mobile-hd-wallpapers", "name": "Cartoon Face HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5568727.jpg", "link": "https://wallpapercave.com/hanuman-hd-mobile-cartoon-wallpapers", "name": "Hanuman HD Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5622258.jpg", "link": "https://wallpapercave.com/mobile-cartoon-girl-wallpapers", "name": "Mobile Cartoon Girl", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4854212.jpg", "link": "https://wallpapercave.com/mobile-cartoon-hd-wallpapers", "name": "Mobile Cartoon HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5732424.jpg", "link": "https://wallpapercave.com/cartoon-mobile-dark-wallpapers", "name": "Cartoon Dark", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5796247.jpg", "link": "https://wallpapercave.com/skeletor-hd-cartoon-mobile-wallpapers", "name": "Skeletor HD Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4928096.jpg", "link": "https://wallpapercave.com/boy-and-girl-cartoon-4k-mobile-wallpapers", "name": "Boy And Girl Cartoon 4k", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5184277.jpg", "link": "https://wallpapercave.com/mr-bean-cartoon-android-mobile-hd-wallpapers", "name": "Mr Bean Cartoon Android HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5420286.jpg", "link": "https://wallpapercave.com/full-hd-cartoon-mobile-wallpapers", "name": "Full HD Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4130938.jpg", "link": "https://wallpapercave.com/aladdin-cartoon-iphone-mobile-wallpapers", "name": "Aladdin Cartoon iPhone", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4975455.jpg", "link": "https://wallpapercave.com/android-mobile-cartoon-wallpapers", "name": "Android Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp6429497.jpg", "link": "https://wallpapercave.com/sesame-street-cartoon-mobile-wallpapers", "name": "Sesame Street Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp6571595.jpg", "link": "https://wallpapercave.com/cartoon-minimal-mobile-wallpapers", "name": "Cartoon Minimal", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp6602708.jpg", "link": "https://wallpapercave.com/cartoon-mobile-girl-wallpapers", "name": "Cartoon Girl", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp6666847.jpg", "link": "https://wallpapercave.com/pubg-mobile-cartoon-wallpapers", "name": "PUBG Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5006383.png", "link": "https://wallpapercave.com/hd-cartoon-men-mobile-wallpapers", "name": "HD Cartoon Men", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp6666875.jpg", "link": "https://wallpapercave.com/pubg-cartoon-mobile-wallpapers", "name": "PUBG Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5956360.jpg", "link": "https://wallpapercave.com/cartoon-for-mobile-wallpapers", "name": "Cartoon For", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp5152438.jpg", "link": "https://wallpapercave.com/japanese-cartoon-full-hd-mobile-wallpapers", "name": "Japanese Cartoon Full HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4469378.jpg", "link": "https://wallpapercave.com/4k-romantic-cartoon-mobile-wallpapers", "name": "4k Romantic Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp7267119.jpg", "link": "https://wallpapercave.com/blue-cartoon-mobile-wallpapers", "name": "Blue Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4193639.png", "link": "https://wallpapercave.com/cartoon-mobile-wallpapers", "name": "Cartoon", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp4975479.jpg", "link": "https://wallpapercave.com/cartoon-hd-mobile-wallpapers", "name": "Cartoon HD", "tag":'cartoon'},
    {"img": "https://wallpapercave.com/wpt/wp2603237.jpg", "link": "https://wallpapercave.com/cute-cartoon-couple-wallpapers-for-mobile", "name": "Cute Cartoon Couple For", "tag":'cartoon'}]


class FlatListItem extends Component{

  render(){
      const {item}=this.props;
      return(
          <TouchableOpacity>
              <View style={{flex: 1, flexDirection: 'column', borderStyle:'solid', borderWidth:1, borderColor:'#e6e6e6', marginBottom:10, marginRight:10, borderRadius:7, width: width/2-15}}>
                <View style={{flex: 2, marginLeft:(width/2-140)/2}}>
                  <Image
                    style={{width: 120, height: 120, borderRadius:60}}
                    source={{ uri: item.img }}
                  />
                </View>
                <View style={{flex: 7, marginTop:5}}>
                    <Text style={{paddingBottom:5, fontSize:15, color:"#009900", textAlign:'center'}}>{item.name}</Text>
                </View>
              </View>
          </TouchableOpacity>
      )
  }
}


export default class HomeComponent extends Component {

  constructor(props){
    super(props);
    this.state ={ 
      isAccept:false,
      item:{},
      isDone:false,
      refreshing:false,
      list_item:[]
    }
  }

  componentWillMount(){
    // SplashScreen.hide();
    this.shuffleArray()
  }
 
  componentDidMount(){
    // this.loadGraphicCards();
  }

  async loadGraphicCards() {
    this.setState({refreshing:true})
    var list_film=[];
    var data=[];
    const searchUrl = 'https://wallpapercave.com/search?q=iphone+13&source=featuredsearches';
    const response = await fetch(searchUrl);  // fetch page 
    const htmlString = await response.text(); 
    // console.log(htmlString)
    const $ = cheerio.load(htmlString);
    $("div#content > div#popular > a.albumthumbnail").each((i,e)=>{
        const img=$(e).find("div.albumphoto > img").attr("src")
        const link="https://wallpapercave.com/"+$(e).attr("href");
        const name=$(e).find("p.title").text();
        let obj={
            link:link,
            name:name,
            img:img,
        }
        list_film.push(obj);
    })
    console.log(list_film)
    const n=list_film.length;
    if(n>0){
      this.setState({isLoading:false, refreshing:false, data:this.state.data.concat(list_film)})
    }else{
      this.setState({isLoading:false, empty:true})
    }
  }

  shuffleArray = () => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
    }
    this.setState({refreshing:false, list_item:data})
  }


  gotoDetail=(item)=>{
    this.props.navigation.navigate("Items",{
      item:item
    });
  }

  onRefresh=()=>{
    this.shuffleArray()
  }

  onChangeText=(text)=>{
    var list=data.filter((v)=>{
      if(v.name.toLowerCase().indexOf(text.toLowerCase())!==-1){
        return v;
      }
    })
    this.setState({list_item:list})
  }


  render() {
    const {refreshing, list_item}=this.state;
      return (
        <View style={{flex:1, padding:10}}>
          <View style={{width:width-20, marginBottom:10}}>
              <TextInput
                  style={{height: 40, borderLeftWidth:1, borderTopWidth:1, borderRightWidth:1,borderBottomWidth:1, borderRadius:5, borderColor:'#cccccc', paddingLeft:15}}
                  placeholder="search"
                  onChangeText={(text) => this.onChangeText(text)}
                  value={this.state.text}
                  onSubmitEditing={this.onSearch}
              />
          </View>
          <FlatList
            style={{flex:1}}
              data={list_item}
              renderItem={({item, index}) => {
                  return (<FlatListItem item={item} index={index} gotoDetail={this.gotoDetail}>
                  </FlatListItem>)
              }}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}/>
              }
          >
          </FlatList>
          <Image
        style={{ width: 50,
          height: 50,}}
        source={{
          uri: 'https://wallpapercave.com/wpt/wp2603237.jpg',
        }}
      />
        </View>
      )
  }
}
