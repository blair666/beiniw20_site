#!/usr/bin/env python3
"""
Simple HTTP server for testing HTML files
Run: python3 test-server.py
Then open: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("📄 Available pages:")
        print(f"   • Main: http://localhost:{PORT}")
        print(f"   • Skills Demo: http://localhost:{PORT}/skills-demo.html")
        print(f"   • Portfolio: http://localhost:{PORT}/portfolio.html")
        print(f"   • Services: http://localhost:{PORT}/services.html")
        print(f"   • Contact: http://localhost:{PORT}/contact.html")
        print("\n🛑 Press Ctrl+C to stop the server")
        
        # Auto-open browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped!")

if __name__ == "__main__":
    start_server()