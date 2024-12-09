'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export function CollegeMatchCard() {
  return (
    <div className="mt-8 space-y-6 max-w-3xl mx-auto px-4">
      <h2 className="text-xl font-medium mb-4 text-center">Your matches</h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
            Discover Your Perfect College Match
          </CardTitle>
          <p className="text-sm text-gray-600">
            Fill out your athletic profile above and click "Start search" to find colleges that best
            match your skills and aspirations.
          </p>
        </CardHeader>
        <CardContent className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capabilities Card */}
            <Card className="bg-gray-100 max-w-sm mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm md:text-base">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Personalized college matches based on your athletic profile
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Support for multiple sports and events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Detailed athletic profiles for accurate matching
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      AI-powered recommendations for optimal results
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitations Card */}
            <Card className="bg-gray-100 max-w-sm mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                  Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm md:text-base">
                  <li className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Results are based on available data and may not be exhaustive
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Not all colleges may be included in our database
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Recommendations are suggestions and not guarantees
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Regular updates are required to maintain accuracy
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Your personalized matches will appear here after you start the search.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
