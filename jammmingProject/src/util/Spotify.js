const clientId = '0afb4904483548aa932d2a43f2746e5d';
const redirectURI = "http://localhost:3000/"


let accessToken;

const Spotify = {
	
	getAccessToken() {
	  if (accessToken) {
		return accessToken;
	  }
		
	const accessTokenSame = window.location.href.match(/access_token=([^&]*)/);
	const expireSame = window.location.href.match(/expires_in=([^&]*)/);
	if (accessTokenSame && expireSame) {
	  accessToken = accessTokenSame[1];
	  const expireTime = Number(expireSame[1]);
	  window.setTimeout(() => accessToken = '', expireTime * 1000);
	  window.history.pushState('Access Token', null, '/');
	  return accessToken;
			
	} else {
	    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
		window.location = redirect;
	  }
	},
	
	search(searchTerm) {
	  const accessToken = Spotify.getAccessToken();
	  return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
	    headers: {
		  Authorization: `Bearer ${accessToken}`
		}
      }).then(response => {
        return response.json();
        }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        ID: track.id,
        Name: track.name,
        Artist: track.artists[0].name,
        Album: track.album.name,
        URI: track.uri
      }));
    });
  },
  
  savePlaylist(playlistName, trackURI) {
    if (!playlistName || !trackURI.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let usersId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(jsonResponse => {
      usersId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURI})
        });
      });
    });
  }
};

export default Spotify;