CRAB::RayCollisionList Sphere::Collide(const CRAB::Ray &ray) const
{
	//Colisions
	CRAB::RayCollisionList col{Inside(_ray.origin)};
	CRAB::Collision t{INFINITY, this};

	const CRAB::Vector4Df& W = _ray.origin;		// The difference of P0 - C
	// Coefficients of the equation
	const float A = dot(_ray.direction, _ray.direction);
	const float B = dot(W, _ray.direction);
	const float C = dot(W, W) - 1;
	// Discriminant
	const float Delta = (B * B - A * C);

	if (Delta < 0.0f) { return col; }

	if (Delta == 0.0) // One intersection
	{
		t.distance = (-B) / (A);
		if (t.distance >= 0) {
			t.normal = _ray.origin + (_ray.direction * t.distance);
			col.collisions.push_back(t);
		}
	}
	else if (Delta > 0.0) // Two intersections
	{
		// First point
		t.distance = (-B - sqrtf(Delta)) / (A);
		if (t.distance >= 0) {
			t.normal = _ray.origin + (_ray.direction * t.distance);
			col.collisions.push_back(t);
		}
		// Second point
		t.distance = (-B + sqrtf(Delta)) / (A);
		if (t.distance >= 0) {
			t.normal = _ray.origin + (_ray.direction * t.distance);
			col.collisions.push_back(t);
		}
	}

	return col;
}