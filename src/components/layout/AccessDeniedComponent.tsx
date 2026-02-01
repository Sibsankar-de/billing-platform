"use client";

import { Lock, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";
import { PrimaryBox } from "../sections/PrimaryBox";

export const AccessDeniedComponent = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-bold text-red-300 mb-4">403</h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-primary/70 mb-8 max-w-md mx-auto">
          You don't have permission to access this resource. Please contact your
          administrator if you believe this is a mistake.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button onClick={() => window.history.back()}>Go Back</Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Go to Homepage
          </Button>
        </div>

        {/* Additional Info */}
        <PrimaryBox>
          <h3 className="text-lg font-semibold text-primary mb-3">
            Why am I seeing this?
          </h3>
          <ul className="text-left text-primary/70 space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                You may not have the necessary permissions to view this page
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Your session may have expired</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>This content may be restricted to certain user roles</span>
            </li>
          </ul>
        </PrimaryBox>

        {/* Support Link */}
        <p className="mt-8 text-primary">
          Need help?{" "}
          <a
            href="/support"
            className="font-semibold underline hover:text-indigo-800"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};
