import http from 'http';
import fs from 'fs';
import mime from 'mime-types';
let lookup = mime.lookup;

const port = process.env.PORT || 3000;

// creates a server instance (immutable)
const server = http.createServer(function(req, res)
{
    let path = req.url as string;
    if (path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    let mimeType = lookup(path.substring(1)) as string;

    fs.readFile(__dirname + path, function(err, data)
    {
        if (err)
        {
            res.writeHead(404);
            res.end("ERROR 404 - File Not Found! " + err.message);
            return;
        }

        res.setHeader("X-Content-Type-Options", "nosniff"); // security patch
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(data);
    });
});

server.listen(port, function() {
  console.log(`Server running at Port:${port}`);
});