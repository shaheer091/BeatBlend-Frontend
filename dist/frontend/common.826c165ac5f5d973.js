"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{5759:(p,a,s)=>{s.d(a,{J:()=>o});var n=s(553),e=s(4946),h=s(9862);let o=(()=>{class i{constructor(t){this.http=t,this.artistApi=`${n.N.apiUrl}/artist`}artistAddSong(t){return this.http.post(`${this.artistApi}/addSong`,t)}artistGetSongs(){return this.http.get(`${this.artistApi}/songs`)}artistDeleteSong(t){return this.http.delete(`${this.artistApi}/deleteSong/${t}`)}artistGetProfile(){return this.http.get(`${this.artistApi}/profile`)}artistUpdateProfile(t){return this.http.patch(`${this.artistApi}/profile`,{profileDetails:t})}artistGetSongDetails(t){return this.http.get(`${this.artistApi}/getSongDetails/${t}`)}artistEditSongDetails(t,r){return this.http.patch(`${this.artistApi}/editSongDetails/${t}`,r)}artistGetHome(){return this.http.get(`${this.artistApi}/home`)}searchArtist(t){return this.http.get(`${this.artistApi}/searchArtist/${t}`)}createBand(t){return this.http.post(`${this.artistApi}/createBand`,t)}static#t=this.\u0275fac=function(r){return new(r||i)(e.LFG(h.eN))};static#i=this.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})()}}]);