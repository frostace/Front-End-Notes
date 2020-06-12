#!/usr/bin/env python


# Feature Extraction Service + Scraping Service
# TODO: resolve this warning
'''
WARNING: This is a development server. Do not use it in a production deployment.
Use a production WSGI server instead.
'''

import joblib 
import json
from flask import Flask, request, jsonify, make_response, Response
from flask_restful import Resource, Api
import traceback

app = Flask(__name__)
api = Api(app)

class Test(Resource):
	def get(self):
		resp = make_response(jsonify({'success': True}))
		resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
		resp.headers['Access-Control-Allow-Methods'] = 'GET'
		resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
		return resp

	def options(self):
		resp = Response("Test CORS")
		resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
		resp.headers['Access-Control-Allow-Methods'] = 'GET'
		resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
		return resp

@app.errorhandler(404)
def not_found(error):
	resp = make_response(jsonify({'error': 'Not found'}), 404)
	resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
	resp.headers['Access-Control-Allow-Methods'] = 'GET'
	resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	return resp

api.add_resource(Test, '/test_api', endpoint="test_api")

if __name__ == '__main__':
	try:
		port = int(sys.argv[1]) # This is for a command-line argument
	except:
		port = 12347 # If you don't provide any port then the port will be set to 12347

	print ('Test Service Running...')

	app.run(port=port, debug=True)