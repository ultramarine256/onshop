<?php

defined( 'ABSPATH' ) || exit;

use \Firebase\JWT\JWT;


/**
 * REST API Auth class.
 */
class ONSHOP_AUTH {

	public static function generate_token( $data ) {
		$issuedat_claim  = time();
		$notbefore_claim = $issuedat_claim + TOKEN_VALIDATION_DELAY_SEC;
		$expire_claim    = $issuedat_claim + TOKEN_EXPIRATION_INTERVAL_SEC;

		$token = [
			"iss"  => ISSUER_CLAIM,
			"aud"  => AUDIENCE_CLAIM,
			"iat"  => $issuedat_claim,
			"nbf"  => $notbefore_claim,
			"exp"  => $expire_claim,
			"data" => $data,
		];

		return JWT::encode( $token, AUTH_SECRET_SIGN_KEY );
	}

	public static function verify_auth() {
		$authHeader = $_SERVER['HTTP_AUTHORIZATION'];

		$arr = explode( " ", $authHeader );

		$jwt = @$arr[1];

		if ( $jwt ) {
			try {
				$decoded = JWT::decode( $jwt, AUTH_SECRET_SIGN_KEY, array( 'HS256' ) );
				$user_id = @$decoded->data->user_id;

				if ( $user_id ) {
					wp_set_current_user( $user_id );

					header( 'OS_Bearer: ' . ONSHOP_AUTH::generate_token($decoded->data) );

					return true;
				}
			} catch ( Exception $e ) {
				// ignore validation failure
			}
		}

		return false;
	}
}
